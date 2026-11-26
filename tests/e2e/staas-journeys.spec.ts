import { test, expect } from "@playwright/test";
import { mkdirSync, readFileSync } from "node:fs";

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

test("capture an actual small-model inference response in the chat", async ({ page }) => {
  const generated = readFileSync("artifacts/model-response.txt", "utf8").trim();
  expect(generated.length).toBeGreaterThan(10);
  await page.route("**/api/chat", async route => {
    const messageId = "ci-local-model";
    const textId = "ci-local-model-text";
    const chunks = [
      { type: "start", messageId },
      { type: "text-start", id: textId },
      { type: "text-delta", id: textId, delta: generated },
      { type: "text-end", id: textId },
      { type: "finish" },
    ];
    const body = chunks.map(chunk => `data: ${JSON.stringify(chunk)}\n\n`).join("") + "data: [DONE]\n\n";
    await route.fulfill({ status: 200, contentType: "text/event-stream", headers: { "cache-control": "no-cache" }, body });
  });
  await page.goto("/?demo=1");
  await page.getByRole("textbox", { name: "Ask STaaS" }).fill("Suggest one first validation experiment for this opportunity.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText(generated, { exact: false })).toBeVisible({ timeout: 15_000 });
  await page.screenshot({ path: `${outputDir}/04-live-model-chat.png`, fullPage: true });
});
