
'use server';

import { prisma } from './db';
import { z } from 'zod';
import { User } from '@prisma/client';

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
  
  try {
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { email: validatedFields.data.email },
                { phoneNumber: validatedFields.data.phoneNumber },
            ]
        }
    });

    if (existingUser) {
        return {
            isSuccess: false,
            errors: { email: ['User with this email or phone number already exists.'] },
            message: 'User already exists.'
        }
    }

    const user = await prisma.user.create({
      data: {
        ...validatedFields.data,
        // In a real app, hash the password before saving
      },
    });

    return {
      isSuccess: true,
      accessToken: 'dummy-jwt-for-' + user.id, // Replace with real JWT logic
      refreshToken: 'dummy-refresh-token',
      errors: null,
    };
  } catch (error: any) {
    return {
      isSuccess: false,
      accessToken: null,
      refreshToken: null,
      errors: [error.message || 'An unknown error occurred.'],
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

    const validatedFields = LoginSchema.safeParse({ phoneNumber, password });
    
    if (!validatedFields.success) {
        return {
            isSuccess: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Invalid fields provided.'
        }
    }

  try {
    const user = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (!user || user.password !== password) { // In real app, compare hashed passwords
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
  } catch (error: any) {
    return {
      isSuccess: false,
      accessToken: null,
      refreshToken: null,
      errors: [error.message || 'An unknown server error occurred.'],
    };
  }
}

export async function logout(token: string, refreshToken: string) {
    // In a real app, you might want to invalidate tokens here.
    return { isSuccess: true, errors: null };
}

export async function refreshToken(token: string, refreshToken: string) {
    // In a real app, you would validate the refresh token and issue a new access token.
    return { 
        isSuccess: true,
        accessToken: 'new-dummy-jwt',
        refreshToken: 'new-dummy-refresh-token',
        errors: null 
    };
}
