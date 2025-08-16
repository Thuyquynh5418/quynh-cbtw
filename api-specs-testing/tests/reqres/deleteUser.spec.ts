import { test, expect } from '../../fixtures/auth.fixtures';
import { deleteUser } from '../../utils/userHelper';

test('Verify that delete existing user successfully', async ({ request, token }) => {
    const userId = 2; 
    const {response} = await deleteUser(request, token, userId);;
    expect(response.status()).toBe(204);
});

test('Verify that delete user with invalid userId successfully', async ({ request, token }) => {
    const userId = "invalid"; 
    const {response} = await deleteUser(request, token, userId);;
    expect(response.status()).toBe(204);
});

test('Verify that delete user without userId successfully', async ({ request, token }) => {
    const userId = ""; 
    const {response} = await deleteUser(request, token, userId);;
    expect(response.status()).toBe(204);
});
