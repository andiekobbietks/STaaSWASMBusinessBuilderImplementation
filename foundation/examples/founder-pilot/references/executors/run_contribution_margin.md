# Contribution margin executor

This document describes the receipt expected by the sample Attested Computation.

1. Read the typed parameters from the computation concept.
2. Execute the referenced Python file without allowing the model to edit it.
3. Record the exact inputs and returned result.
4. Calculate SHA-256 over the exact computation file bytes and include it as computation_sha256.
5. Return a receipt containing inputs, result and computation_sha256.

Example inputs:

- units_sold: 20
- selling_price_gbp: "8.00"
- variable_cost_gbp: "3.20"

Expected result:

- revenue_gbp: "160.00"
- variable_cost_total_gbp: "64.00"
- contribution_gbp: "96.00"
- contribution_margin_pct: "60.00"

This is an illustrative executor contract, not a production sandbox or secure remote execution service.
