import { test, expect } from "@playwright/test";
import { mkdirSync } from "node:fs";

const outputDir = "docs/screenshots";
mkdirSync(outputDir, { recursive: true });

test("capture the founder opportunity overview", async ({ page }) => {
  await page.goto("/?demo=1");
  await expect(page.getByRole("heading", { name: "Founder opportunity brief" })).toBeVisible();
  await expect(page.getByText("Evidence coverage")).toBeVisible();
  await page.screenshot({ path: `${outputDir}/01-founder-overview.png`, fullPage: true });
});

test("capture market discovery and evidence gaps", async ({ page }) => {
  await page.goto("/?demo=1");
  await page.getByRole("button", { name: "Market discovery" }).click();
  await expect(page.getByRole("heading", { name: "Market discovery" })).toBeVisible();
  await expect(page.getByText("Demand evidence")).toBeVisible();
  await page.screenshot({ path: `${outputDir}/02-market-discovery.png`, fullPage: true });
});

test("capture interactive financial scenario controls", async ({ page }) => {
  await page.goto("/?demo=1");
  await page.getByRole("button", { name: "Business model" }).click();
  await expect(page.getByRole("heading", { name: "Business model studio" })).toBeVisible();
  const customers = page.getByRole("slider", { name: "Monthly customers" });
  await customers.focus();
  for (let i = 0; i < 8; i++) await customers.press("ArrowRight");
  const price = page.getByRole("slider", { name: "Average monthly price" });
  await price.focus();
  for (let i = 0; i < 10; i++) await price.press("ArrowRight");
  await expect(page.getByText("£9,800").first()).toBeVisible();
  await page.screenshot({ path: `${outputDir}/03-business-model.png`, fullPage: true });
});

test("confirm chat remains disabled until the authenticated gateway exists", async ({ page }) => {
  await page.goto("/?demo=1");
  await expect(page.getByText("Chat inference is disabled until an authenticated gateway is available.")).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Ask STaaS" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Send message" })).toBeDisabled();
  await page.screenshot({ path: `${outputDir}/04-chat-disabled.png`, fullPage: true });
});
