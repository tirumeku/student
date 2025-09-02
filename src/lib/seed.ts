import type { Student } from '@/types';

export const initialStudents: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Alice Johnson',
    studentId: 'STU001',
    course: 'Computer Science',
    interests: 'AI, Machine Learning, Web Development',
  },
  {
    name: 'Bob Williams',
    studentId: 'STU002',
    course: 'Business Administration',
    interests: 'Marketing, Finance, Entrepreneurship',
  },
  {
    name: 'Charlie Brown',
    studentId: 'STU003',
    course: 'Graphic Design',
    interests: 'UI/UX, Illustration, Branding',
  },
  {
    name: 'Diana Miller',
    studentId: 'STU004',
    course: 'Mechanical Engineering',
    interests: 'Robotics, 3D Printing, CAD Modeling',
  },
  {
    name: 'Eve Davis',
    studentId: 'STU005',
    course: 'Psychology',
    interests: 'Cognitive Science, Behavioral Psychology, Neuroscience',
  },
];
