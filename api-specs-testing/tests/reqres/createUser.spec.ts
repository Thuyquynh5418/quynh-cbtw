import { test, expect} from '../../fixtures/auth.fixtures';
import { createUser } from '../../utils/userHelper';
import { z } from 'zod';

const userTestData = require('../../test-data/user.json');

test('Verify that create user successfully', async ({ request, token }) => {

    //Post request to create user
    const {response, responseBody} = await createUser(request, token, userTestData[0]);

    // Assert
    expect(response.status()).toBe(201);
    expect(responseBody.name).toBe(userTestData[0].name);
    expect(responseBody.job).toBe(userTestData[0].job);
    const userSchema = z.object({
        name: z.string(),
        job: z.string(),
        id: z.string(),
        createdAt: z.string()
    });
    expect(() => userSchema.parse(responseBody)).not.toThrow();
});

test('Verify create user successfully successfully with missing job field', async ({ request, token }) => {

    //Post request to create user
    const {response, responseBody} = await createUser(request, token, userTestData[1]);

    // Assert
    expect(response.status()).toBe(201);
    const userSchema = z.object({
        name: z.string(),
        id: z.string(),
        createdAt: z.string()
    });
    expect(() => userSchema.parse(responseBody)).not.toThrow();
});

test('Verify that create user successfully with empty body', async ({ request, token }) => {
    const userData = {};

    //Post request to create user without token
    const {response, responseBody} = await createUser(request, token, userData);

    // Assert
    expect(response.status()).toBe(201);
    const userSchema = z.object({
        id: z.string(),
        createdAt: z.string()
    });
    expect(() => userSchema.parse(responseBody)).not.toThrow();
});