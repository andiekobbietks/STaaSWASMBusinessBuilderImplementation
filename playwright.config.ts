import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    ...devices["Desktop Chrome"],
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
    env: {
      VITE_SUPABASE_URL: "http://127.0.0.1:54321",
      VITE_SUPABASE_ANON_KEY: "ci-demo-anon-key",
      VITE_DEMO_MODEL_STATUS: process.env.VITE_DEMO_MODEL_STATUS || "Local model ready",
      LLM_BASE_URL: "http://127.0.0.1:11434/v1",
      LLM_MODEL: "qwen2.5:0.5b",
      LLM_API_KEY: "local-demo",
      STAAS_DEMO_CHAT: "true",
    },
  },
});
