#!/usr/bin/env python3
"""Validate STaaS profile metadata in an OKF v0.3 bundle.

This checks the STaaS profile only. It is not a replacement for the
canonical OKF validator and does not establish evidence truth or rights.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

from jsonschema import Draft202012Validator, FormatChecker
from ruamel.yaml import YAML
from ruamel.yaml.error import YAMLError

PROFILE_TYPES = {
    "Business Context",
    "Customer Segment",
    "Market Observation",
    "Evidence Claim",
    "Assumption",
    "Strategic Option",
    "Decision",
    "Experiment",
    "Metric",
    "Outcome",
    "Learning Concept",
    "Attested Computation",
}

TYPE_REQUIRED_FIELDS = {
    "Evidence Claim": ("claim_kind", "review_state"),
    "Assumption": ("impact", "uncertainty"),
    "Decision": ("decision_state", "selected_option_id"),
    "Experiment": (
        "execution_status",
        "hypothesis",
        "method",
        "success_criteria",
    ),
    "Learning Concept": ("learning_steps",),
    "Metric": ("unit", "scope"),
}


def parse_frontmatter(path: Path) -> dict[str, Any] | None:
    lines = path.read_text(encoding="utf-8").splitlines()
    if not lines or lines[0] != "---":
        return None
    try:
        closing = lines.index("---", 1)
    except ValueError as exc:
        raise ValueError("frontmatter closing delimiter is missing") from exc

    yaml = YAML(typ="safe")
    yaml.version = (1, 2)
    try:
        value = yaml.load("\n".join(lines[1:closing]))
    except YAMLError as exc:
        raise ValueError(f"invalid YAML frontmatter: {exc}") from exc
    if not isinstance(value, dict):
        raise ValueError("frontmatter must be a YAML mapping")
    return value


def validate_concept(
    document: dict[str, Any],
    validator: Draft202012Validator,
) -> list[str]:
    errors = [
        f"{'.'.join(str(part) for part in error.absolute_path) or 'frontmatter'}: {error.message}"
        for error in validator.iter_errors(document)
    ]

    kind = document.get("type")
    extension = document.get("x-staas")
    if isinstance(extension, dict):
        for field in TYPE_REQUIRED_FIELDS.get(kind, ()):
            if field not in extension:
                errors.append(f"x-staas.{field}: required for type {kind}")
        if kind == "Evidence Claim" and extension.get("review_state") == "human_reviewed":
            for field in ("reviewed_by", "reviewed_at"):
                if not extension.get(field):
                    errors.append(f"x-staas.{field}: required when review_state is human_reviewed")
    return errors


def validate_bundle(bundle: Path) -> tuple[int, list[str]]:
    schema_path = Path(__file__).resolve().parents[1] / "schemas" / "staas-profile-0.1.schema.json"
    schema = json.loads(schema_path.read_text(encoding="utf-8"))
    Draft202012Validator.check_schema(schema)
    validator = Draft202012Validator(schema, format_checker=FormatChecker())

    index_path = bundle / "index.md"
    if not index_path.is_file():
        return 0, ["bundle index.md is missing"]

    try:
        index = parse_frontmatter(index_path)
    except (ValueError, OSError) as exc:
        return 0, [f"index.md: {exc}"]
    if not isinstance(index, dict) or index.get("okf_version") != "0.3":
        return 0, ['index.md: expected okf_version: "0.3"']

    checked = 0
    errors: list[str] = []
    profile_documents: list[tuple[Path, dict[str, Any]]] = []
    for path in sorted(bundle.rglob("*.md")):
        if path.name in {"index.md", "log.md"}:
            continue
        if any(part.startswith(".") for part in path.relative_to(bundle).parts):
            continue
        try:
            document = parse_frontmatter(path)
        except (ValueError, OSError) as exc:
            errors.append(f"{path.relative_to(bundle)}: {exc}")
            continue
        if not isinstance(document, dict) or document.get("type") not in PROFILE_TYPES:
            continue
        checked += 1
        profile_documents.append((path, document))
        for message in validate_concept(document, validator):
            errors.append(f"{path.relative_to(bundle)}: {message}")

    concepts_by_id: dict[str, dict[str, Any]] = {}
    for path, document in profile_documents:
        extension = document.get("x-staas")
        if not isinstance(extension, dict):
            continue
        concept_id = extension.get("id")
        if not isinstance(concept_id, str):
            continue
        if concept_id in concepts_by_id:
            errors.append(
                f"{path.relative_to(bundle)}: duplicate x-staas.id {concept_id}"
            )
        else:
            concepts_by_id[concept_id] = document

    for path, document in profile_documents:
        if document.get("type") != "Decision":
            continue
        extension = document.get("x-staas")
        if not isinstance(extension, dict):
            continue
        selected_id = extension.get("selected_option_id")
        selected = concepts_by_id.get(selected_id)
        if selected is None:
            errors.append(
                f"{path.relative_to(bundle)}: selected_option_id does not resolve"
            )
        elif selected.get("type") != "Strategic Option":
            errors.append(
                f"{path.relative_to(bundle)}: selected_option_id must reference a Strategic Option"
            )

    return checked, errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("bundle", type=Path, help="Path to an OKF v0.3 bundle")
    args = parser.parse_args()

    if not args.bundle.is_dir():
        print(f"Bundle directory not found: {args.bundle}", file=sys.stderr)
        return 2

    checked, errors = validate_bundle(args.bundle)
    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1

    print(f"STaaS profile validation passed: {checked} concepts checked.")
    print("Run the canonical OKF validator separately for base-format conformance.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
