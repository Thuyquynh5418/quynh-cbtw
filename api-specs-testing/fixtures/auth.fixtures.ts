import { test as baseTest, expect } from "@playwright/test";
import { getEnvConfig } from '../utils/envHelper';
import { login } from "../utils/loginHelper";

const env = process.env.ENV || 'test';
const config = getEnvConfig(env);

type AuthFixtures = {
  token: string | null;
};

export const test = baseTest.extend<AuthFixtures>({
  token: async ({ request }, use) => {
    // const response = await request.post("/api/login", {
    //   data: {
    //     email: config.username,
    //     password: config.password,
    //   },
    // });
    const { response } = await login(request, {
      email: config.username,
      password: config.password,
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.token).toBeDefined();
    await use(responseBody.token);
  },
});

export { expect } from '@playwright/test';
