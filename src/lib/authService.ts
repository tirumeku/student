
'use server';

const API_BASE_URL = 'http://localhost:5160/api/Auth';

interface AuthResponse {
  isSuccess: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  errors: string[] | null;
}

export async function login({ phoneNumber, password }: { phoneNumber: string; password: string; }): Promise<AuthResponse> {
  // The admin ID is fixed as requested.
  const adminId = "b1e55c84-9055-4eb5-8bd4-a262538f7e66";

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber, password }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({errors: ['Invalid response from server.']}));
        return {
            isSuccess: false,
            accessToken: null,
            refreshToken: null,
            errors: errorData.errors || ['HTTP error! status: ' + response.status],
        };
    }

    const data: AuthResponse = await response.json();
    return data;
  } catch (error: any) {
    return {
      isSuccess: false,
      accessToken: null,
      refreshToken: null,
      errors: [error.message || 'An unexpected error occurred.'],
    };
  }
}
