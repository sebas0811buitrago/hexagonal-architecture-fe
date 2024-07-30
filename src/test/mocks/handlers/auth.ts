import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

export const handlers = [
  http.post('/login', async ({ request }) => {
    const { username, password } = (await request.json()) as {
      username: string;
      password: string;
    };

    if (username === 'user' && password === 'password') {
      return HttpResponse.json(
        {
          message: 'Login successful',
          token: 'fake-jwt-token',
          user: {
            name: 'Sebastian',
            email: 'sebas@gmail.com'
          }
        },
        { status: 201 }
      );
    }

    return HttpResponse.json(null, { status: 201 });
  })
];

export const server = setupServer(...handlers);
