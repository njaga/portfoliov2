module.exports = {
  testDir: "./tests",
  timeout: 30000,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:4100",
    browserName: "chromium",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "pnpm start -p 4100",
    url: "http://127.0.0.1:4100/blog",
    timeout: 120000,
    reuseExistingServer: !process.env.CI,
  },
};
