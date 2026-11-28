from decimal import Decimal, ROUND_HALF_UP


def compute_contribution_margin(
    units_sold: int,
    selling_price_gbp: str,
    variable_cost_gbp: str,
) -> dict[str, str]:
    if units_sold < 0:
        raise ValueError("units_sold must be non-negative")

    price = Decimal(selling_price_gbp)
    variable_cost = Decimal(variable_cost_gbp)
    if price < 0 or variable_cost < 0:
        raise ValueError("prices and costs must be non-negative")
    if variable_cost > price:
        raise ValueError("variable cost per unit cannot exceed selling price in this example")
    revenue = Decimal(units_sold) * price
    variable_total = Decimal(units_sold) * variable_cost
    contribution = revenue - variable_total
    margin = (contribution / revenue * Decimal("100")) if revenue else Decimal("0")
    money = Decimal("0.01")
    return {
        "revenue_gbp": str(revenue.quantize(money, rounding=ROUND_HALF_UP)),
        "variable_cost_total_gbp": str(variable_total.quantize(money, rounding=ROUND_HALF_UP)),
        "contribution_gbp": str(contribution.quantize(money, rounding=ROUND_HALF_UP)),
        "contribution_margin_pct": str(margin.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)),
    }
