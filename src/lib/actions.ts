
'use server';

import { z } from 'zod';
import { addStudent, setBranding } from './data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { activityRecommender } from '@/ai/flows/activity-recommender';
import type { Student } from '@/types';
import type { ActivityRecommenderOutput } from '@/ai/flows/activity-recommender';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  studentId: z.string().min(1, {
    message: 'Student ID is required.',
  }),
  course: z.string().min(2, {
    message: 'Course must be at least 2 characters.',
  }),
  interests: z.string().min(10, {
    message: 'Interests must be at least 10 characters.',
  }),
});

export type State = {
  errors?: {
    name?: string[];
    studentId?: string[];
    course?: string[];
    interests?: string[];
  };
  message?: string | null;
};

export async function createStudent(prevState: State, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    name: formData.get('name'),
    studentId: formData.get('studentId'),
    course: formData.get('course'),
    interests: formData.get('interests'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create student.',
    };
  }

  try {
    await addStudent(validatedFields.data);
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to create student.',
    };
  }

  revalidatePath('/students');
  revalidatePath('/');
  redirect('/students');
}

export async function getAIRecommendation(student: Student): Promise<ActivityRecommenderOutput> {
  const recommendation = await activityRecommender({
    name: student.name,
    studentId: student.studentId,
    course: student.course,
    interests: student.interests,
  });
  return recommendation;
}

export type BrandingState = {
  message?: string | null;
  errors?: {
    logo?: string[];
  };
  success?: boolean;
};

const LogoSchema = z.object({
  logo: z
    .any()
    .refine((file) => file?.size > 0, 'Logo image is required.')
    .refine(
      (file) => file?.size < 4 * 1024 * 1024,
      'Max logo size is 4MB.'
    )
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'].includes(file?.type),
      'Only .jpg, .png, .webp, and .svg formats are supported.'
    ),
});


export async function uploadBranding(prevState: BrandingState, formData: FormData): Promise<BrandingState> {
  const validatedFields = LogoSchema.safeParse({
    logo: formData.get('logo'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid file. Failed to upload logo.',
    };
  }

  const { logo } = validatedFields.data;
  
  try {
    const buffer = Buffer.from(await logo.arrayBuffer());
    const filename = `${Date.now()}-${logo.name}`;
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const publicPath = join(uploadDir, filename);

    // Ensure the uploads directory exists
    await mkdir(uploadDir, { recursive: true });

    await writeFile(publicPath, buffer);
    
    const logoUrl = `/uploads/${filename}`;
    await setBranding({ logoUrl });
    
    revalidatePath('/login');
    revalidatePath('/settings');
    
    return { success: true, message: 'Logo uploaded successfully!' };
  } catch (error) {
    console.error('Failed to upload logo:', error);
    return { message: 'Failed to upload logo.' };
  }
}
