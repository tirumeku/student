
import type { Student } from '@/types';

// In-memory array to store students
let students: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    studentId: 'STU001',
    course: 'Computer Science',
    interests: 'AI, machine learning, and web development.',
  },
  {
    id: '2',
    name: 'Bob Williams',
    studentId: 'STU002',
    course: 'Business Administration',
    interests: 'Entrepreneurship, marketing, and finance.',
  },
  {
    id: '3',
    name: 'Charlie Brown',
    studentId: 'STU003',
    course: 'Graphic Design',
    interests: 'UI/UX design, illustration, and branding.',
  },
  {
    id: '4',
    name: 'Diana Prince',
    studentId: 'STU004',
    course: 'Mechanical Engineering',
    interests: 'Robotics, 3D printing, and sustainable energy.',
  },
  {
    id: '5',
    name: 'Ethan Hunt',
    studentId: 'STU005',
    course: 'Computer Science',
    interests: 'Cybersecurity, ethical hacking, and cryptography.',
  },
  {
    id: '6',
    name: 'Fiona Glenanne',
    studentId: 'STU006',
    course: 'Psychology',
    interests: 'Cognitive psychology, social behavior, and clinical studies.',
  },
  {
    id: '7',
    name: 'George Costanza',
    studentId: 'STU007',
    course: 'Business Administration',
    interests: 'Stock market, management strategies, and napping.',
  },
];

// Simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getStudents = async (): Promise<Student[]> => {
  await delay(500);
  return Promise.resolve(students);
};

export const addStudent = async (studentData: Omit<Student, 'id'>): Promise<Student> => {
  await delay(500);
  const newStudent: Student = {
    ...studentData,
    id: (students.length + 1).toString(),
  };
  students.unshift(newStudent);
  return Promise.resolve(newStudent);
};
