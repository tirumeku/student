
'use server';

// NOTE: In a real app, you would want to move the base URL to an environment variable.
const AUTH_API_URL = 'http://localhost:5160/api/Auth';

export async function registerUser(userData: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}) {
  try {
    const response = await fetch(`${AUTH_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    return {
      isSuccess: false,
      accessToken: null,
      refreshToken: null,
      errors: [error.message || 'An unknown network error occurred.'],
    };
  }
}

export async function login({
  phoneNumber,
  password,
}: {
  phoneNumber: string;
  password: string;
}) {
  try {
    const response = await fetch(`${AUTH_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber, password }),
    });
    
    const result = await response.json();
    return result;

  } catch (error: any) {
    return {
      isSuccess: false,
      accessToken: null,
      refreshToken: null,
      errors: [error.message || 'An unknown network error occurred.'],
    };
  }
}

export async function logout(token: string, refreshToken: string) {
  try {
    const response = await fetch(`${AUTH_API_URL}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, refreshToken }),
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    return { isSuccess: false, errors: [error.message] };
  }
}

export async function refreshToken(token: string, refreshToken: string) {
    try {
        const response = await fetch(`${AUTH_API_URL}/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, refreshToken }),
        });
        const result = await response.json();
        return result;
    } catch (error: any) {
        return { isSuccess: false, errors: [error.message] };
    }
}
