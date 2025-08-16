import { test, expect} from '../../fixtures/auth.fixtures';
import { updateUser } from '../../utils/userHelper';
import { z } from 'zod';

const userUpdate = require('../../test-data/user.json');

test('Verify that update user successfully with name and job', async ({ request, token }) => {
    // Arrange: Define the user ID and update data
    const userId = 2;

    //Action
    const {response, responseBody} = await updateUser(request, token, userId, userUpdate[2]);

    // Assert: Validate the response body structure using Zod schema
    expect(response.status()).toBe(200);
    const userSchema = z.object({
        name: z.string(),
        job: z.string(),
        updatedAt: z.string()
    });
    expect(() => userSchema.parse(responseBody)).not.toThrow();
});

test('Verify that update user successfully with invalid userId', async ({ request, token }) => {
    // Arrange: Define the update data and an invalid user ID
    const userId = "quynh";

    //Action
    const {response, responseBody} = await updateUser(request, token, userId, userUpdate[2]);

    // Assert: Validate the response body structure using Zod schema
    expect(response.status()).toBe(200);
    const userSchema = z.object({
        name: z.string(),
        job: z.string(),
        updatedAt: z.string()
    });
    expect(() => userSchema.parse(responseBody)).not.toThrow();
});

test('Verify that update user successfully with empty body', async ({ request, token }) => {
    const userId = 2;

    //Action
    const {response, responseBody} = await updateUser(request, token, userId, userUpdate[3]);

    // Assert: Validate the response body structure using Zod schema
    expect(response.status()).toBe(200);
    const userSchema = z.object({
        updatedAt: z.string()
    });
    expect(() => userSchema.parse(responseBody)).not.toThrow();
});

