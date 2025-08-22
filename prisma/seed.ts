import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminUser = await prisma.user.upsert({
    where: { phoneNumber: '0989736223' },
    update: {},
    create: {
      id: 'b1e55c84-9055-4eb5-8bd4-a262538f7e66',
      firstName: 'Admin',
      lastName: 'User',
      phoneNumber: '0989736223',
      email: 'admin@example.com',
      password: 'password', // In a real app, use a hashed password
    },
  });
  console.log({ adminUser });

  const students = [
  {
    id: '1',
    name: 'Alice Johnson',
    studentId: 'STU001',
    course: 'Computer Science',
    interests: 'AI, machine learning, and web development.',
    createdAt: new Date('2023-09-01T10:00:00Z'),
  },
  {
    id: '2',
    name: 'Bob Williams',
    studentId: 'STU002',
    course: 'Business Administration',
    interests: 'Entrepreneurship, marketing, and finance.',
    createdAt: new Date('2023-09-02T11:30:00Z'),
  },
  {
    id: '3',
    name: 'Charlie Brown',
    studentId: 'STU003',
    course: 'Graphic Design',
    interests: 'UI/UX design, illustration, and branding.',
    createdAt: new Date('2023-09-03T09:15:00Z'),
  },
  {
    id: '4',
    name: 'Diana Prince',
    studentId: 'STU004',
    course: 'Mechanical Engineering',
    interests: 'Robotics, 3D printing, and sustainable energy.',
    createdAt: new Date('2023-09-04T14:00:00Z'),
  },
  {
    id: '5',
    name: 'Ethan Hunt',
    studentId: 'STU005',
    course: 'Computer Science',
    interests: 'Cybersecurity, ethical hacking, and cryptography.',
    createdAt: new Date('2023-09-05T16:45:00Z'),
  },
];

for (const student of students) {
    await prisma.student.upsert({
        where: { studentId: student.studentId },
        update: {},
        create: student,
    });
}
 console.log(`Seeded ${students.length} students`);


}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
