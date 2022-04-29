import prisma from "../database.js";

async function findUnique(id: number) {
  return prisma.teacherDiscipline.findUnique({
    where: {
      id
    }
  });
}

export default {
  findUnique
};
