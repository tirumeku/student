'use server';

/**
 * @fileOverview A flow to provide personalized club/activity recommendations based on a student's profile.
 *
 * - activityRecommender - A function that handles the activity recommendation process.
 * - ActivityRecommenderInput - The input type for the activityRecommender function.
 * - ActivityRecommenderOutput - The return type for the activityRecommender function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ActivityRecommenderInputSchema = z.object({
  name: z.string().describe('The name of the student.'),
  studentId: z.string().describe('The ID of the student.'),
  course: z.string().describe('The course the student is enrolled in.'),
  interests: z.string().describe('The interests of the student.'),
});
export type ActivityRecommenderInput = z.infer<typeof ActivityRecommenderInputSchema>;

const ActivityRecommenderOutputSchema = z.object({
  shouldRecommend: z
    .boolean()
    .describe(
      'Whether or not the student should be recommended to join clubs/activities.'
    ),
  reason: z.string().describe('The reason for the recommendation or non-recommendation.'),
});
export type ActivityRecommenderOutput = z.infer<typeof ActivityRecommenderOutputSchema>;

export async function activityRecommender(
  input: ActivityRecommenderInput
): Promise<ActivityRecommenderOutput> {
  return activityRecommenderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'activityRecommenderPrompt',
  input: {schema: ActivityRecommenderInputSchema},
  output: {schema: ActivityRecommenderOutputSchema},
  prompt: `You are an AI assistant that recommends whether a student should be encouraged to join clubs or activities based on their profile.

  Student Name: {{{name}}}
  Student ID: {{{studentId}}}
  Course: {{{course}}}
  Interests: {{{interests}}}

  Based on this information, determine if the student should be recommended to join clubs/activities.
  Explain your reasoning.
  Set the shouldRecommend field to true or false accordingly.
  `,
});

const activityRecommenderFlow = ai.defineFlow(
  {
    name: 'activityRecommenderFlow',
    inputSchema: ActivityRecommenderInputSchema,
    outputSchema: ActivityRecommenderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
