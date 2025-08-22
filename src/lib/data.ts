
'use server';

import type { Student } from '@/types';

// In-memory data store
let students: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    studentId: 'STU001',
    course: 'Computer Science',
    interests: 'AI, Machine Learning, and Web Development.',
    createdAt: new Date('2023-09-15T09:00:00Z'),
    updatedAt: new Date('2023-09-15T09:00:00Z'),
  },
  {
    id: '2',
    name: 'Bob Williams',
    studentId: 'STU002',
    course: 'Business Administration',
    interests: 'Marketing, Entrepreneurship, and Finance.',
    createdAt: new Date('2023-09-16T11:30:00Z'),
    updatedAt: new Date('2023-09-16T11:30:00Z'),
  },
  {
    id: '3',
    name: 'Charlie Brown',
    studentId: 'STU003',
    course: 'Graphic Design',
    interests: 'UI/UX, Illustration, and Animation.',
    createdAt: new Date('2023-09-17T14:00:00Z'),
    updatedAt: new Date('2023-09-17T14:00:00Z'),
  },
  {
    id: '4',
    name: 'Diana Prince',
    studentId: 'STU004',
    course: 'Mechanical Engineering',
    interests: 'Robotics, 3D Printing, and Renewable Energy.',
    createdAt: new Date('2023-09-18T16:45:00Z'),
    updatedAt: new Date('2023-09-18T16:45:00Z'),
  },
    {
    id: '5',
    name: 'Eve Adams',
    studentId: 'STU005',
    course: 'Psychology',
    interests: 'Cognitive Behavioral Therapy, and Child Development.',
    createdAt: new Date('2023-09-19T10:20:00Z'),
    updatedAt: new Date('2023-09-19T10:20:00Z'),
  },
];

export const getStudents = async (): Promise<Student[]> => {
  // Simulate async delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return students.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const addStudent = async (studentData: { name: string; studentId: string; course: string; interests: string }): Promise<Student> => {
  // Simulate async delay
  await new Promise(resolve => setTimeout(resolve, 50));
  const newStudent: Student = {
    id: crypto.randomUUID(),
    ...studentData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  students.unshift(newStudent); // Add to the beginning to keep it sorted by recent
  return newStudent;
};

export const getStudentById = async (id: string): Promise<Student | null> => {
  // Simulate async delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return students.find(student => student.id === id) || null;
}
