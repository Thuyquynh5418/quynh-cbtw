import { test, expect} from '../../fixtures/auth.fixtures';
import { login } from '../../utils/login-helper';

const loginTestData = require('../../test-data/login.json');

test('Verify that login successfully via API with valid credential', async ({ request }) => {
    // Action
    const {response, responseBody} = await login(request, loginTestData[0]);
    
    // Assert
    expect(response.status()).toBe(200);
    expect(responseBody.token).toBeTruthy();
});

test('Verify that login unsuccessful login returns 400 (should FAIL)', async ({ request }) => {

    // Action
    const {response, responseBody} = await login(request, loginTestData[1]);
    
    // Deliberately wrong expectation: expect 200 but API returns 400
    expect(response.status()).toBe(200);
    expect(responseBody.token).toBeTruthy();
});