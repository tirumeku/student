import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const students = [
    {
      name: 'Alice Johnson',
      studentId: 'STU001',
      course: 'Computer Science',
      interests: 'AI, machine learning, and web development.',
    },
    {
      name: 'Bob Williams',
      studentId: 'STU002',
      course: 'Business Administration',
      interests: 'Entrepreneurship, marketing, and finance.',
    },
    {
      name: 'Charlie Brown',
      studentId: 'STU003',
      course: 'Graphic Design',
      interests: 'UI/UX design, illustration, and branding.',
    },
    {
      name: 'Diana Prince',
      studentId: 'STU004',
      course: 'Mechanical Engineering',
      interests: 'Robotics, 3D printing, and sustainable energy.',
    },
    {
      name: 'Ethan Hunt',
      studentId: 'STU005',
      course: 'Computer Science',
      interests: 'Cybersecurity, ethical hacking, and cryptography.',
    },
  ];

  for (const student of students) {
    await prisma.student.upsert({
      where: { studentId: student.studentId },
      update: {},
      create: student,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
