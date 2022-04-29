import prisma from "../database.js";

async function findMany() {
  return prisma.teacher.findMany();
}

export default {
  findMany
};
