import type { Student } from '@/types';

// In-memory data store
let students: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    studentId: 'STU001',
    course: 'Computer Science',
    interests: 'Loves coding, hiking, and playing the guitar. Interested in AI and web development.',
    createdAt: new Date('2023-09-01T10:00:00Z'),
    updatedAt: new Date('2023-09-01T10:00:00Z'),
  },
  {
    id: '2',
    name: 'Bob Williams',
    studentId: 'STU002',
    course: 'Business Administration',
    interests: 'Enjoys public speaking, marketing, and chess. Looking to join a business club.',
    createdAt: new Date('2023-09-02T11:30:00Z'),
    updatedAt: new Date('2023-09-02T11:30:00Z'),
  },
  {
    id: '3',
    name: 'Charlie Brown',
    studentId: 'STU003',
    course: 'Graphic Design',
    interests: 'Passionate about digital art, typography, and photography. Member of the art club.',
    createdAt: new Date('2023-09-03T14:15:00Z'),
    updatedAt: new Date('2023-09-03T14:15:00Z'),
  },
  {
    id: '4',
    name: 'Diana Miller',
    studentId: 'STU004',
    course: 'Mechanical Engineering',
    interests: 'Fascinated by robotics, 3D printing, and sustainable energy. Always in the workshop.',
    createdAt: new Date('2023-09-04T09:05:00Z'),
    updatedAt: new Date('2023-09-04T09:05:00Z'),
  },
  {
    id: '5',
    name: 'Ethan Davis',
    studentId: 'STU005',
    course: 'Psychology',
    interests: 'Interested in cognitive psychology, volunteering, and playing the piano.',
    createdAt: new Date('2023-09-05T16:45:00Z'),
    updatedAt: new Date('2023-09-05T16:45:00Z'),
  },
];

export const getStudents = async (): Promise<Student[]> => {
  // Simulate async delay
  await new Promise(resolve => setTimeout(resolve, 50));
  // Return a sorted copy
  return [...students].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
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
  students.unshift(newStudent); // Add to the beginning to keep the list sorted by creation date
  return newStudent;
};

export const getStudentById = async (id: string): Promise<Student | null> => {
    // Simulate async delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return students.find(student => student.id === id) || null;
}
