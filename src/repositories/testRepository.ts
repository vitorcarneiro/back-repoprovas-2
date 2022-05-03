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

async function findById(id: number) {
  return prisma.test.findUnique({
    where: {
      id,
    },
  });
}

async function updateView(id: number, views: number) {{
  return prisma.test.update({
    where: {
      id,
    },
    data: {
      views,
    },
  })
}}

export default {
  getTestsByDiscipline,
  getTestsByTeachers,
  insert,
  getTeachersDisciplines,
  findById,
  updateView,
};
