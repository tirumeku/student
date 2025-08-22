import type { Student } from '@/types';
import { prisma } from './db';

// Simulate async data fetching
export const getStudents = async (): Promise<Student[]> => {
  const students = await prisma.student.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return students;
};

export const addStudent = async (studentData: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Promise<Student> => {
  const newStudent = await prisma.student.create({
    data: {
        ...studentData
    }
  })
  return newStudent;
};

export const getStudentById = async (id: string): Promise<Student | null> => {
    const student = await prisma.student.findUnique({
        where: { id }
    })
  return student;
};