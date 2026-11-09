const { test, expect } = require("@playwright/test");

test("English browser is redirected to the English homepage", async ({ browser }) => {
  const context = await browser.newContext({ locale: "en-US" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL(/\/en\/?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "en_US");
  await context.close();
});

test("French browser stays on / and English can be explicitly requested", async ({ browser }) => {
  const context = await browser.newContext({ locale: "fr-FR" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await page.goto("/en/blog");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/en\/blog$/);
  await context.close();
});

test("Explicit language preference is not overridden by browser locale", async ({ browser }) => {
  const context = await browser.newContext({ locale: "en-US" });
  await context.addCookies([{
    name: "locale_preference", value: "fr",
    url: "http://127.0.0.1:4100/",
  }]);
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await context.close();
});

test("Blog pagination normalizes invalid pages without changing language", async ({ page }) => {
  await page.goto("/en/blog?page=0");
  await expect(page).toHaveURL(/\/en\/blog$/);
  await page.goto("/en/blog?page=9999");
  await expect(page).toHaveURL(/\/en\/blog\?page=\d+$/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/en\/blog\?page=\d+/);
});

test("Translated article metadata includes language alternate and schema", async ({ page }) => {
  await page.goto("/en/blog/mon-experience-chez-vigilus");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/en\/blog\/mon-experience-chez-vigilus$/);
  await expect(page.locator('link[hreflang="fr"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "en_US");
});

test("RSS respects the requested locale and contains valid feed metadata", async ({ request }) => {
  for (const [path, language] of [["/rss", "fr-SN"], ["/en/rss", "en-US"]]) {
    const response = await request.get(path);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("application/rss+xml");
    const xml = await response.text();
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain(`<language>${language}</language>`);
    expect(xml).toContain("<guid isPermaLink=");
    expect(xml).not.toContain("<description>undefined</description>");
  }
});

test("Contact API rejects malformed submissions and unsafe origins", async ({ request }) => {
  const invalid = await request.post("/api/contact", {
    data: { name: "X", email: "invalid", subject: "a", message: "b", captchaToken: "x" },
  });
  expect(invalid.status()).toBe(400);
  const foreign = await request.post("/api/contact", {
    headers: { origin: "https://invalid.example" },
    data: {},
  });
  expect(foreign.status()).toBe(403);
});

test("Security response headers are enabled", async ({ request }) => {
  const response = await request.get("/en/blog");
  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response.headers()["x-frame-options"]).toBe("DENY");
  expect(response.headers()["referrer-policy"]).toBe("strict-origin-when-cross-origin");
});
