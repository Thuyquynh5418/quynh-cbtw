// import { test, expect } from '@playwright/test';
import { test, expect} from '../../fixtures/auth.fixtures';
import { getUser } from '../../utils/userHelper';
import { z } from 'zod';
import { get } from 'http';

test('Verify that get existing user successfully', async ({ request, token }) => {
    const userId = 2;
    //Action
    const {response, responseBody} = await getUser(request, token, userId);
    
    //Assert the response status and body
    expect(response.status()).toBe(200);
    const userSchema = z.object({
        data: z.object({
            id: z.number(),
            email: z.string(),
            first_name: z.string(),
            last_name: z.string(),
            avatar: z.string()
        }),
        support: z.object({
            url: z.string(),
            text: z.string()
        })
    });
    expect(() => userSchema.parse(responseBody)).not.toThrow();
    
});

test('Verify that get non-existing user unsuccessfully', async ({ request, token }) => {
    const userId = 9999;
    //Action
    const {response, responseBody} = await getUser(request, token, userId);
    
    //Assert the response status and body
    expect(response.status()).toBe(404);
}),

test('Verify that get user unsuccessfully with invalid userId', async ({ request, token }) => {
    const userId = "a2@$!Pewh&";
    //Action
    const {response, responseBody} = await getUser(request, token, userId);
    
    //Assert the response status and body
    expect(response.status()).toBe(404);
});