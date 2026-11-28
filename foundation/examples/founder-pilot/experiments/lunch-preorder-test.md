---
type: Experiment
title: "Two-week lunch pre-order test"
description: "A bounded test of paid weekday lunch demand."
tags: [synthetic, experiment, validation]
status: draft
x-staas:
  profile_version: "0.1.0"
  id: "6e6c6c8d-2c6f-4e8f-a6e7-666666666666"
  record_version: 1
  execution_status: "planned"
  hypothesis: "A weekday lunch pre-order offer can generate at least 15 paid orders on a typical pilot day."
  method: "Publish a limited menu, accept paid pre-orders and record completed collections over ten operating days."
  success_criteria:
    - "At least 15 paid orders on 7 of 10 operating days."
    - "Refund rate remains below 5 percent."
    - "Contribution margin is at least 55 percent."
  failure_criteria:
    - "Fewer than 8 paid orders on 7 or more operating days."
    - "Contribution margin remains below 40 percent after one menu adjustment."
---

# Experiment protocol

## Duration

Ten operating days across a two-week period.

## Measurement

Record paid orders, completed collections, refunds, variable costs and repeat purchases.

## Guardrails

Do not sign a lease or purchase major equipment as part of this experiment. Use only synthetic records in this example bundle.

## Result

Not run. This fixture demonstrates a planned experiment only.

## Related concepts

- [Weekday lunch demand assumption](../assumptions/weekday-lunch-demand.md)
- [Contribution margin computation](../metrics/contribution-margin.md)
