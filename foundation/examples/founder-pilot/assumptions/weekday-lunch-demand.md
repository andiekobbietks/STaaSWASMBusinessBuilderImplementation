---
type: Assumption
title: "Weekday lunch pre-orders can reach 15 paid orders per day"
description: "High-impact, uncertain assumption to test before committing to fixed premises."
tags: [synthetic, assumption, demand]
status: draft
x-staas:
  profile_version: "0.1.0"
  id: "3e3c3c8d-2c6f-4e8f-a6e7-333333333333"
  record_version: 1
  impact: "high"
  uncertainty: "high"
  confidence:
    value: 0.35
    actor: "human:example-founder"
    at: "2026-11-28T00:00:00Z"
    scale: "subjective-belief"
---

# Assumption

At least 15 customers will pay for a weekday lunch pre-order on a typical pilot day.

The founder's confidence value is a subjective belief for this fictional example. It is not a probability estimate or an evidence-quality score.

## Evidence so far

The [synthetic customer signal](../evidence/lunch-preorder-signal.md) suggests stated interest, but does not demonstrate payment behaviour.

## Validation method

Run a two-week pre-order test and count completed paid orders, refunds and repeat purchases.

## Related concepts

- [Two-week lunch pre-order experiment](../experiments/lunch-preorder-test.md)
- [Test pre-orders before committing to a lease](../decisions/test-preorders.md)
