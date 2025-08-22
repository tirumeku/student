'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createStudent, type State } from '@/lib/actions';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Terminal } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  studentId: z.string().min(1, 'Student ID is required.'),
  course: z.string().min(2, 'Course must be at least 2 characters.'),
  interests: z.string().min(10, 'Please describe interests in at least 10 characters.'),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Registering Student...' : 'Register Student'}
    </Button>
  );
}

export function RegistrationForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createStudent, initialState);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      studentId: '',
      course: '',
      interests: '',
    },
    // To show server-side errors
    errors: state.errors
      ? (Object.fromEntries(
          Object.entries(state.errors).map(([key, value]) => [
            key,
            { type: 'manual', message: value[0] },
          ])
        ) as any)
      : {},
  });

  return (
    <form action={dispatch} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Jane Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student ID</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. STU12345" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Computer Science" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <FormField
        control={form.control}
        name="interests"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Interests</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe the student's interests, hobbies, or skills. This will be used for AI recommendations."
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Provide details that could help in recommending activities.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {state.message && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
