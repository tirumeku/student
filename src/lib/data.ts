'use server';

import type { Student } from '@/types';

// In-memory data store
let students: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    studentId: 'STU001',
    course: 'Computer Science',
    interests: 'AI, Machine Learning, Web Development',
    createdAt: new Date('2023-09-01T10:00:00Z'),
    updatedAt: new Date('2023-09-01T10:00:00Z'),
  },
  {
    id: '2',
    name: 'Bob Williams',
    studentId: 'STU002',
    course: 'Business Administration',
    interests: 'Marketing, Finance, Entrepreneurship',
    createdAt: new Date('2023-09-02T11:30:00Z'),
    updatedAt: new Date('2023-09-02T11:30:00Z'),
  },
  {
    id: '3',
    name: 'Charlie Brown',
    studentId: 'STU003',
    course: 'Graphic Design',
    interests: 'UI/UX, Illustration, Branding',
    createdAt: new Date('2023-09-03T09:15:00Z'),
    updatedAt: new Date('2023-09-03T09:15:00Z'),
  },
  {
    id: '4',
    name: 'Diana Miller',
    studentId: 'STU004',
    course: 'Mechanical Engineering',
    interests: 'Robotics, 3D Printing, CAD Modeling',
    createdAt: new Date('2023-09-04T14:00:00Z'),
    updatedAt: new Date('2023-09-04T14:00:00Z'),
  },
  {
    id: '5',
    name: 'Eve Davis',
    studentId: 'STU005',
    course: 'Psychology',
    interests: 'Cognitive Science, Behavioral Psychology, Neuroscience',
    createdAt: new Date('2023-09-05T16:45:00Z'),
    updatedAt: new Date('2023-09-05T16:45:00Z'),
  },
];

// Simulate async data fetching
export const getStudents = async (): Promise<Student[]> => {
  // Sort by createdAt in descending order to show newest first
  return [...students].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const addStudent = async (studentData: {
  name: string;
  studentId: string;
  course: string;
  interests: string;
}): Promise<Student> => {
  const newStudent: Student = {
    id: crypto.randomUUID(),
    ...studentData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  students.unshift(newStudent); // Add to the beginning of the array
  return newStudent;
};

export const getStudentById = async (id: string): Promise<Student | null> => {
    return students.find((student) => student.id === id) || null;
}
