// auth.setup.ts
import { test as setup } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.GITHUB_USERNAME || "";
const password = process.env.GITHUB_PASSWORD || "";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  console.log("Authenticating...", username);
  console.log("Authenticating...", password);
  await page.goto("http://localhost:3000");
  await page.getByRole("button", { name: "Sign in with Github" }).click();
  await page.getByLabel("Username or email address").click();
  await page.getByLabel("Username or email address").fill(username);
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();
  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
