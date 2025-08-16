import { APIRequestContext } from "@playwright/test";
import { da } from "zod/locales";

export async function getUser(request, token, userId) {
    const response = await request.get(`/api/users/${userId}`, {
        headers: { 
            'Authorization': `Bearer ${token}`
        },
    });
    const responseBody = await response.json();
    return {
        response,
        responseBody,
    };
}

export async function createUser(request, token, createData) {

    const response = await request.post('/api/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: createData
    });

    const responseBody = await response.json();

    return {
        response,
        responseBody,
    }
}

export async function updateUser(request, token, userId, userData) {

    const response = await request.put(`/api/users/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: userData
    });

    const responseBody = await response.json();

    return {
        response,
        responseBody,
    }
}

export async function deleteUser(request, token, userId) {
    const response = await request.delete(`/api/users/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return {
        response
    }
}