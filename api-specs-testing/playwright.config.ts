import { defineConfig, devices } from '@playwright/test';
import { getEnvConfig } from './utils/env-helper';

const env = process.env.ENV || 'test';
const config = getEnvConfig(env);

export default defineConfig({
    timeout: 30000,
    testDir: './tests',
    fullyParallel: true,
    reporter: [['html', { open: 'never' }], ['list']],
    use: {
        baseURL: config.baseURL,
        extraHTTPHeaders: {
            'x-api-key': 'reqres-free-v1',
            'Content-Type': 'application/json'
        }
        },

    projects: [
        {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
        },
        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'] },
        // }
    ],
});
