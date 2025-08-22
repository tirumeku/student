import type { Student } from '@/types';

// In-memory array to store student data
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
    createdAt: new Date('2023-09-03T09:15:00Z'),
    updatedAt: new Date('2023-09-03T09:15:00Z'),
  },
  {
    id: '4',
    name: 'Diana Prince',
    studentId: 'STU004',
    course: 'Mechanical Engineering',
    interests: 'Robotics, 3D printing, and sustainable energy.',
    createdAt: new Date('2023-09-04T14:00:00Z'),
    updatedAt: new Date('2023-09-04T14:00:00Z'),
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
];

// Simulate async data fetching
export const getStudents = async (): Promise<Student[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Sort by most recently created
      const sortedStudents = [...students].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
      resolve(sortedStudents);
    }, 500); // Simulate network delay
  });
};

export const addStudent = async (studentData: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Promise<Student> => {
    return new Promise((resolve) => {
        const newStudent: Student = {
            id: (students.length + 1).toString(),
            ...studentData,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        students.push(newStudent);
        setTimeout(() => {
            resolve(newStudent);
        }, 500); // Simulate network delay
    });
};

export const getStudentById = async (id: string): Promise<Student | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const student = students.find((s) => s.id === id) || null;
            resolve(student);
        }, 500);
    });
};
