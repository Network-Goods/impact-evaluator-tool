import { test as setup } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Your email address").click();
  await page.getByPlaceholder("Your email address").fill("j@jmoggr.com");
  await page.getByPlaceholder("Your password").click();
  await page.getByPlaceholder("Your password").fill("123456");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();

  // Delay is require for log in to complete before cookies can be correctly saved
  await page.waitForTimeout(1000);

  await page.context().storageState({ path: authFile });
});
