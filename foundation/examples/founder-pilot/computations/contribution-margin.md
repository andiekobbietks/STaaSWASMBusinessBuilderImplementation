---
type: Attested Computation
title: "Contribution margin percentage"
description: "Deterministic calculation of contribution margin from selling price and variable cost per unit."
tags: [synthetic, calculation, attested-computation]
status: draft
runtime: python
parameters:
  - { name: units_sold, type: integer, required: true }
  - { name: selling_price_gbp, type: number, required: true }
  - { name: variable_cost_gbp, type: number, required: true }
computation: "/references/computations/contribution_margin.py"
executor:
  resource: "/references/executors/run_contribution_margin.md"
  receipt: [inputs, result, computation_sha256]
attester:
  resource: "/references/attesters/verify_contribution_margin.py"
generated: { by: "process:staas-example", at: "2026-11-28T00:00:00Z" }
x-staas:
  profile_version: "0.1.0"
  id: "8e8c8c8d-2c6f-4e8f-a6e7-888888888888"
  record_version: 1
---

# Computation

Contribution margin (%) = ((selling price - variable cost) / selling price) × 100

The computation is illustrative. It does not include fixed costs, tax, waste, refunds, payment fees or other business-specific costs unless they are included in variable_cost_gbp.

## Example parameters

- units_sold: 20
- selling_price_gbp: 8.00
- variable_cost_gbp: 3.20

Expected result: revenue £160.00, variable costs £64.00, contribution £96.00 and contribution margin 60.00 percent.

## Interpretation

The attester checks that the receipt is consistent with the sanctioned computation and its inputs. It does not validate the source of the inputs or prove that the business is profitable.
