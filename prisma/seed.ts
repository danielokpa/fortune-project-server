import 'dotenv/config';
import { PrismaClient, Role } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import * as argon2 from 'argon2';

// Use the TURSO_DATABASE_URL if available, otherwise fall back to local
const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || 'file:./prisma/dev.db';

const prisma = new PrismaClient({
  adapter: new PrismaLibSql({ 
    url,
    authToken: process.env.TURSO_AUTH_TOKEN 
  }),
});

async function main() {
  const adminHash = await argon2.hash('Admin123!');
  const lecturerHash = await argon2.hash('Lecturer123!');
  const studentHash = await argon2.hash('Student123!');
  const pinHash = await argon2.hash('1234');

  const admin = await prisma.user.upsert({
    where: { email: 'admin@unical.edu.ng' },
    update: {},
    create: {
      fullName: 'System Admin',
      email: 'admin@unical.edu.ng',
      passwordHash: adminHash,
      role: Role.ADMIN,
    },
  });

  const lecturer = await prisma.user.upsert({
    where: { email: 'jane.lecturer@unical.edu.ng' },
    update: {},
    create: {
      fullName: 'Dr Jane Lecturer',
      email: 'jane.lecturer@unical.edu.ng',
      passwordHash: lecturerHash,
      role: Role.LECTURER,
    },
  });

  const studentUser = await prisma.user.upsert({
    where: { email: 'john.student@unical.edu.ng' },
    update: {},
    create: {
      fullName: 'John Student',
      email: 'john.student@unical.edu.ng',
      passwordHash: studentHash,
      role: Role.STUDENT,
      student: {
        create: {
          matricNumber: 'CS/2021/001',
          department: 'Computer Science',
          pinHash,
        },
      },
    },
    include: { student: true },
  });

  const course = await prisma.course.upsert({
    where: { courseCode: 'CSC 401' },
    update: {},
    create: {
      courseCode: 'CSC 401',
      title: 'Software Engineering',
      unitLoad: 3,
      lecturerId: lecturer.id,
    },
  });

  if (studentUser.student) {
    await prisma.enrollment.upsert({
      where: {
        studentId_courseId_academicSession: {
          studentId: studentUser.student.id,
          courseId: course.id,
          academicSession: '2024/2025',
        },
      },
      update: {},
      create: {
        studentId: studentUser.student.id,
        courseId: course.id,
        academicSession: '2024/2025',
      },
    });
  }

  console.log('Seeded users:', {
    admin: admin.email,
    lecturer: lecturer.email,
    student: studentUser.email,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
