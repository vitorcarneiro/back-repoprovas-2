import teacherRepository from "../repositories/teacherRepository.js";

async function findMany() {
  return teacherRepository.findMany();
}

export default {
  findMany,
};
