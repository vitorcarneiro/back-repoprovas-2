import prisma from "../database.js";
import { CreateTestData } from './../services/testService';

async function getTestsByDiscipline() {
  return prisma.term.findMany({
    include: {
      disciplines: {
        include: {
          teacherDisciplines: {
            include: {
              teacher: true,
              tests: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

async function getTestsByTeachers() {
  return prisma.teacherDiscipline.findMany({
    include: {
      teacher: true,
      discipline: true,
      tests: {
        include: {
          category: true,
        },
      },
    },
  });
}

async function insert(createTestData: CreateTestData) {
  return prisma.test.create({
    data: createTestData,
  });
}

async function getTeachersDisciplines() {
  return prisma.teacherDiscipline.findMany({
    select: {
      id: true,
      discipline: {
        select: {
          id: true,
          name: true,
        }
      },
      teacher: true
    }
  });
}


export default {
  getTestsByDiscipline,
  getTestsByTeachers,
  insert,
  getTeachersDisciplines
};
