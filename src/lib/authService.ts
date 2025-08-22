'use server';

import { z } from 'zod';

// Mock user data store
const users = [
  {
    id: 'b1e55c84-9055-4eb5-8bd4-a262538f7e66',
    firstName: 'Admin',
    lastName: 'User',
    phoneNumber: '0989736223',
    email: 'admin@example.com',
    password: 'password', // In a real app, use a hashed password
  },
];

const RegisterSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z.string().min(10, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const LoginSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number is required'),
  password: z.string().min(6, 'Password is required'),
});

export async function registerUser(userData: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}) {
  const validatedFields = RegisterSchema.safeParse(userData);

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields provided.',
    };
  }

  const { email, phoneNumber } = validatedFields.data;
  const existingUser = users.find(
    (u) => u.email === email || u.phoneNumber === phoneNumber
  );

  if (existingUser) {
    return {
      isSuccess: false,
      errors: { general: ['User with this email or phone number already exists.'] },
      message: 'User already exists.',
    };
  }
  
  const newUser = {
      id: crypto.randomUUID(),
      ...validatedFields.data
  }

  users.push(newUser);

  return {
    isSuccess: true,
    accessToken: 'dummy-jwt-for-' + newUser.id,
    refreshToken: 'dummy-refresh-token',
    errors: null,
  };
}

export async function login({
  phoneNumber,
  password,
}: {
  phoneNumber: string;
  password: string;
}) {
  const validatedFields = LoginSchema.safeParse({ phoneNumber, password });

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      errors: { general: ['Invalid fields provided.'] },
    };
  }

  const user = users.find((u) => u.phoneNumber === phoneNumber);

  if (!user || user.password !== password) {
    return {
      isSuccess: false,
      accessToken: null,
      refreshToken: null,
      errors: ['Invalid phone number or password.'],
    };
  }

  return {
    isSuccess: true,
    accessToken: 'dummy-jwt-for-' + user.id, // Replace with real JWT logic
    refreshToken: 'dummy-refresh-token',
    errors: null,
  };
}
