
export async function login(request, data) {
    const response = await request.post('/api/login', {
        data: {
            email: data.email,
            password: data.password,
        }
    });
    const responseBody = await response.json();
    return {
        response,
        responseBody,
    };
}