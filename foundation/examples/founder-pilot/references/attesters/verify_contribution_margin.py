from __future__ import annotations

import hashlib
import importlib.util
from pathlib import Path
from typing import Any

EXPECTED_COMPUTATION_SHA256 = "af70189fb574f2c8ea3314a920338e0d4211c7d4067c0c6f98ce6e699333a170"


def attest(receipt: dict[str, Any], bundle_root: Path) -> dict[str, Any]:
    computation_path = (
        bundle_root / "references" / "computations" / "contribution_margin.py"
    )
    if not computation_path.is_file():
        return {"ok": False, "reason": "Sanctioned computation file is missing"}

    actual_hash = hashlib.sha256(computation_path.read_bytes()).hexdigest()
    if actual_hash != EXPECTED_COMPUTATION_SHA256:
        return {"ok": False, "reason": "Sanctioned computation differs from the reviewed example hash"}
    if receipt.get("computation_sha256") != EXPECTED_COMPUTATION_SHA256:
        return {"ok": False, "reason": "Executed computation hash does not match bundle file"}

    spec = importlib.util.spec_from_file_location(
        "staas_contribution_margin", computation_path
    )
    if spec is None or spec.loader is None:
        return {"ok": False, "reason": "Could not load sanctioned computation"}
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)

    inputs = receipt.get("inputs")
    if not isinstance(inputs, dict):
        return {"ok": False, "reason": "Receipt inputs are missing"}

    try:
        expected = module.compute_contribution_margin(
            units_sold=int(inputs["units_sold"]),
            selling_price_gbp=str(inputs["selling_price_gbp"]),
            variable_cost_gbp=str(inputs["variable_cost_gbp"]),
        )
    except (KeyError, TypeError, ValueError) as exc:
        return {"ok": False, "reason": f"Receipt inputs are invalid: {exc}"}

    if receipt.get("result") != expected:
        return {"ok": False, "reason": "Receipt result does not match deterministic recomputation"}

    return {"ok": True, "reason": "Receipt matches the sanctioned computation and inputs"}
