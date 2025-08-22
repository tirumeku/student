import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

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
    {
      name: 'Fiona Glenanne',
      studentId: 'STU006',
      course: 'Psychology',
      interests: 'Cognitive psychology, social behavior, and clinical studies.',
    },
    {
      name: 'George Costanza',
      studentId: 'STU007',
      course: 'Business Administration',
      interests: 'Stock market, management strategies, and napping.',
    },
  ];

  for (const s of students) {
    const student = await prisma.student.create({
      data: s,
    });
    console.log(`Created student with id: ${student.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
