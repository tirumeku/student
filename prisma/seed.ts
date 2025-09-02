/**
 * NOTE: This seed script is non-functional as Prisma has been removed
 * from this project due to environment compatibility issues.
 * The application's data is currently seeded in-memory from /src/lib/data.ts.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  const students = [
    {
      name: 'Alice Johnson',
      studentId: 'STU001',
      course: 'Computer Science',
      interests: 'AI, Machine Learning, Web Development',
    },
    {
      name: 'Bob Williams',
      studentId: 'STU002',
      course: 'Business Administration',
      interests: 'Marketing, Finance, Entrepreneurship',
    },
    {
      name: 'Charlie Brown',
      studentId: 'STU003',
      course: 'Graphic Design',
      interests: 'UI/UX, Illustration, Branding',
    },
    {
      name: 'Diana Miller',
      studentId: 'STU004',
      course: 'Mechanical Engineering',
      interests: 'Robotics, 3D Printing, CAD Modeling',
    },
    {
      name: 'Eve Davis',
      studentId: 'STU005',
      course: 'Psychology',
      interests: 'Cognitive Science, Behavioral Psychology, Neuroscience',
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
