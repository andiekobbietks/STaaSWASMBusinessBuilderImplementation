from __future__ import annotations

import hashlib
import importlib.util
import sys
import unittest
from pathlib import Path

FOUNDATION = Path(__file__).resolve().parents[1]
BUNDLE = FOUNDATION / "examples" / "founder-pilot"
sys.path.insert(0, str(FOUNDATION / "tools"))

from validate_profile import validate_bundle  # noqa: E402


class ProfileTests(unittest.TestCase):
    def test_synthetic_founder_bundle_passes_profile_validation(self) -> None:
        checked, errors = validate_bundle(BUNDLE)
        self.assertGreaterEqual(checked, 7)
        self.assertEqual(errors, [])

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


if __name__ == "__main__":
    unittest.main()
