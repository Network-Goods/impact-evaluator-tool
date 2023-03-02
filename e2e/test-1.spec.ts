import { test, expect } from "@playwright/test";

// test("test", async ({ page }) => {
//   await page.goto("/");
//   await page.getByRole("button", { name: "Sign in with Github" }).click();
//   await expect(page.getByRole("heading", { name: "Dashboard" })).toHaveText("Dashboard");
// });

test("test2", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Join Round" }).click();
  await page.locator('label:has-text("Enter the unique round code:") input[type="text"]').click();
  await page.locator('label:has-text("Enter the unique round code:") input[type="text"]').fill("SubmissionsDemo");
  await page.getByRole("button", { name: "Join" }).click();
  await page.getByText("Invalid invite code. code: SubmissionsDemo").click();
});
