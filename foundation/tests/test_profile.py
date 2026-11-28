from __future__ import annotations

import hashlib
import json
import importlib.util
import shutil
import sys
import tempfile
import unittest

from jsonschema import Draft202012Validator, FormatChecker
from pathlib import Path

FOUNDATION = Path(__file__).resolve().parents[1]
BUNDLE = FOUNDATION / "examples" / "founder-pilot"
sys.path.insert(0, str(FOUNDATION / "tools"))

from validate_profile import validate_bundle, validate_concept  # noqa: E402


class ProfileTests(unittest.TestCase):
    def test_synthetic_founder_bundle_passes_profile_validation(self) -> None:
        checked, errors = validate_bundle(BUNDLE)
        self.assertGreaterEqual(checked, 9)
        self.assertEqual(errors, [])

    def test_human_reviewed_evidence_requires_reviewer_and_timestamp(self) -> None:
        schema_path = FOUNDATION / "schemas" / "staas-profile-0.1.schema.json"
        schema = json.loads(schema_path.read_text(encoding="utf-8"))
        validator = Draft202012Validator(schema, format_checker=FormatChecker())
        document = {
            "type": "Evidence Claim",
            "x-staas": {
                "profile_version": "0.1.0",
                "id": "2e2c2c8d-2c6f-4e8f-a6e7-222222222222",
                "record_version": 1,
                "claim_kind": "source_claim",
                "review_state": "human_reviewed",
            },
        }
        errors = validate_concept(document, validator)
        self.assertTrue(any("reviewed_by" in error for error in errors))
        self.assertTrue(any("reviewed_at" in error for error in errors))

    def test_attested_computation_matches_expected_example(self) -> None:
        computation_path = (
            BUNDLE / "references" / "computations" / "contribution_margin.py"
        )
        spec = importlib.util.spec_from_file_location(
            "sample_contribution_margin", computation_path
        )
        self.assertIsNotNone(spec)
        self.assertIsNotNone(spec.loader)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)

        result = module.compute_contribution_margin(
            units_sold=20,
            selling_price_gbp="8.00",
            variable_cost_gbp="3.20",
        )
        self.assertEqual(
            result,
            {
                "revenue_gbp": "160.00",
                "variable_cost_total_gbp": "64.00",
                "contribution_gbp": "96.00",
                "contribution_margin_pct": "60.00",
            },
        )

    def test_attester_rejects_tampered_receipt(self) -> None:
        computation_path = (
            BUNDLE / "references" / "computations" / "contribution_margin.py"
        )
        attester_path = (
            BUNDLE / "references" / "attesters" / "verify_contribution_margin.py"
        )
        spec = importlib.util.spec_from_file_location(
            "sample_contribution_margin_attester", attester_path
        )
        self.assertIsNotNone(spec)
        self.assertIsNotNone(spec.loader)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)

        receipt = {
            "inputs": {
                "units_sold": 20,
                "selling_price_gbp": "8.00",
                "variable_cost_gbp": "3.20",
            },
            "result": {
                "revenue_gbp": "160.00",
                "variable_cost_total_gbp": "64.00",
                "contribution_gbp": "96.00",
                "contribution_margin_pct": "60.00",
            },
            "computation_sha256": hashlib.sha256(
                computation_path.read_bytes()
            ).hexdigest(),
        }
        self.assertTrue(module.attest(receipt, BUNDLE)["ok"])
        receipt["result"]["contribution_margin_pct"] = "99.00"
        self.assertFalse(module.attest(receipt, BUNDLE)["ok"])

    def test_decision_must_reference_an_existing_strategic_option(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            copied_bundle = Path(directory) / "bundle"
            shutil.copytree(BUNDLE, copied_bundle)
            decision_path = copied_bundle / "decisions" / "test-preorders.md"
            content = decision_path.read_text(encoding="utf-8")
            content = content.replace(
                "5e5c5c8d-2c6f-4e8f-a6e7-555555555555",
                "aeacac8d-2c6f-4e8f-a6e7-aaaaaaaaaaaa",
            )
            decision_path.write_text(content, encoding="utf-8")
            _, errors = validate_bundle(copied_bundle)
            self.assertTrue(
                any("selected_option_id does not resolve" in error for error in errors)
            )

    def test_attester_rejects_modified_computation_file(self) -> None:
        attester_path = (
            BUNDLE / "references" / "attesters" / "verify_contribution_margin.py"
        )
        spec = importlib.util.spec_from_file_location(
            "sample_contribution_margin_attester_pinned", attester_path
        )
        self.assertIsNotNone(spec)
        self.assertIsNotNone(spec.loader)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)

        with tempfile.TemporaryDirectory() as directory:
            copied_bundle = Path(directory) / "bundle"
            shutil.copytree(BUNDLE, copied_bundle)
            computation_path = (
                copied_bundle / "references" / "computations" / "contribution_margin.py"
            )
            computation_path.write_text(
                computation_path.read_text(encoding="utf-8") + "\n# altered\n",
                encoding="utf-8",
            )
            receipt = {
                "inputs": {
                    "units_sold": 20,
                    "selling_price_gbp": "8.00",
                    "variable_cost_gbp": "3.20",
                },
                "result": {
                    "revenue_gbp": "160.00",
                    "variable_cost_total_gbp": "64.00",
                    "contribution_gbp": "96.00",
                    "contribution_margin_pct": "60.00",
                },
                "computation_sha256": hashlib.sha256(
                    computation_path.read_bytes()
                ).hexdigest(),
            }
            result = module.attest(receipt, copied_bundle)
            self.assertFalse(result["ok"])


if __name__ == "__main__":
    unittest.main()
