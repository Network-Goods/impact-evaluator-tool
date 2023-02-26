import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Sign in with Github" }).click();
  await expect(page.getByRole("heading", { name: "Dashboard" })).toHaveText("Dashboard");
});
