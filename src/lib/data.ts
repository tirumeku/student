import type { Student } from '@/types';

// In-memory store for students
let students: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    studentId: 'STU001',
    course: 'Computer Science',
    interests: 'AI, machine learning, and web development.',
    createdAt: new Date('2023-09-01T10:00:00Z'),
    updatedAt: new Date('2023-09-01T10:00:00Z'),
  },
  {
    id: '2',
    name: 'Bob Williams',
    studentId: 'STU002',
    course: 'Business Administration',
    interests: 'Entrepreneurship, marketing, and finance.',
    createdAt: new Date('2023-09-02T11:30:00Z'),
    updatedAt: new Date('2023-09-02T11:30:00Z'),
  },
  {
    id: '3',
    name: 'Charlie Brown',
    studentId: 'STU003',
    course: 'Graphic Design',
    interests: 'UI/UX design, illustration, and branding.',
    createdAt: new Date('2023-09-03T14:15:00Z'),
    updatedAt: new Date('2023-09-03T14:15:00Z'),
  },
  {
    id: '4',
    name: 'Diana Prince',
    studentId: 'STU004',
    course: 'Mechanical Engineering',
    interests: 'Robotics, 3D printing, and sustainable energy.',
    createdAt: new Date('2023-09-04T09:00:00Z'),
    updatedAt: new Date('2023-09-04T09:00:00Z'),
  },
  {
    id: '5',
    name: 'Ethan Hunt',
    studentId: 'STU005',
    course: 'Computer Science',
    interests: 'Cybersecurity, ethical hacking, and cryptography.',
    createdAt: new Date('2023-09-05T16:45:00Z'),
    updatedAt: new Date('2023-09-05T16:45:00Z'),
  },
  {
    id: '6',
    name: 'Fiona Glenanne',
    studentId: 'STU006',
    course: 'Psychology',
    interests: 'Cognitive psychology, social behavior, and clinical studies.',
    createdAt: new Date('2023-09-06T13:20:00Z'),
    updatedAt: new Date('2023-09-06T13:20:00Z'),
  },
  {
    id: '7',
    name: 'George Costanza',
    studentId: 'STU007',
    course: 'Business Administration',
    interests: 'Stock market, management strategies, and napping.',
    createdAt: new Date('2023-09-07T11:00:00Z'),
    updatedAt: new Date('2023-09-07T11:00:00Z'),
  },
];

// Simulate async data fetching
export const getStudents = async (): Promise<Student[]> => {
  // Sort by createdAt descending to show newest first
  const sortedStudents = [...students].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
  return Promise.resolve(sortedStudents);
};

export const addStudent = async (studentData: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Promise<Student> => {
  const newStudent: Student = {
    id: (students.length + 1).toString(),
    ...studentData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  students.push(newStudent);
  return Promise.resolve(newStudent);
};

export const getStudentById = async (id: string): Promise<Student | null> => {
  const student = students.find((s) => s.id === id);
  return Promise.resolve(student || null);
};
