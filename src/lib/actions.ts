'use server';

import { z } from 'zod';
import { addStudent } from './data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { activityRecommender } from '@/ai/flows/activity-recommender';
import type { Student } from '@/types';
import type { ActivityRecommenderOutput } from '@/ai/flows/activity-recommender';

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
      message: 'Database Error: Failed to create student.',
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
