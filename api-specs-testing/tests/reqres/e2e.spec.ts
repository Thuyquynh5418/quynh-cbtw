import { test, expect } from '../../fixtures/auth.fixtures';
import { getUser, createUser, deleteUser, updateUser } from '../../utils/user-helper';
import { z } from 'zod';

const userTestData = require('../../test-data/user.json');

test ('Verify the e2e flow of user Create - Get - Update - Delete', async ({ request, token }) => {
    // Step 1: Create a new user
    const {response: createResponse, responseBody: createResponseBody } = await createUser(request, token, userTestData[0]);
    
    expect(createResponse.status()).toBe(201);
    const createUserSchema = z.object({
        name: z.string(),
        job: z.string(),
        id: z.string(),
        createdAt: z.string()
    });
    expect(() => createUserSchema.parse(createResponseBody)).not.toThrow();
    const createdUserId = createResponseBody.id; // Store the created user ID for later use

    // Step 2: Verify user by GET
    const {response: getResponse, responseBody: getResponseBody } = await getUser(request, token, createdUserId);
    
    // Return 404 because the mock API does not persist real users
    expect(getResponse.status()).toBe(404);


    // Step 3: Update the created user
    const {response: updateResponse, responseBody: updateResponseBody } = await updateUser(request, token, createdUserId, userTestData[2]);
    expect(updateResponse.status()).toBe(200);

    // Step 4: Delete the created user
    const {response: deleteResponse } = await deleteUser(request, token, createdUserId);
    expect(deleteResponse.status()).toBe(204);

    // Step 5: Verify the user is deleted by trying to get the user again
    const {response: verifyDeleteResponse } = await getUser(request, token, createdUserId);
    expect(verifyDeleteResponse.status()).toBe(404);
});

test ('Verify the e2e flow of user Get - Update', async ({ request, token }) => {
    // Step 1: Get user
    const userId = 2;
    const { response: getResponse, responseBody: getResponseBody } = await getUser(request, token, userId);
    expect(getResponse.status()).toBe(200);

    // Step 2: Update the created user with new data
    // Note: The mock API does not persist real users, so this will not actually update a user
    const {response, responseBody} = await updateUser(request, token, userId, userTestData[2]);
    expect(response.status()).toBe(200);
    const userSchema = z.object({
        name: z.string(),
        job: z.string(),
        updatedAt: z.string()
    });
    expect(() => userSchema.parse(responseBody)).not.toThrow();


});