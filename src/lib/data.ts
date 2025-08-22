import type { Student } from '@/types';
import { prisma } from './db';


// Simulate async data fetching
export const getStudents = async (): Promise<Student[]> => {
  const students = await prisma.student.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return students.map(student => ({
      ...student,
      createdAt: new Date(student.createdAt),
      updatedAt: new Date(student.updatedAt),
  }));
};

export const addStudent = async (studentData: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Promise<Student> => {
    const newStudent = await prisma.student.create({
        data: studentData
    });
    return {
        ...newStudent,
        createdAt: new Date(newStudent.createdAt),
        updatedAt: new Date(newStudent.updatedAt),
    };
};

export const getStudentById = async (id: string): Promise<Student | null> => {
    const student = await prisma.student.findUnique({
        where: { id }
    });
    if (!student) return null;
    return {
        ...student,
        createdAt: new Date(student.createdAt),
        updatedAt: new Date(student.updatedAt),
    };
};
