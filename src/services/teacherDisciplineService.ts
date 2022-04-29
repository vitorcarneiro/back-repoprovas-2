import teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js";

async function findUnique(id: number) {
    return teacherDisciplineRepository.findUnique(id);
  }

export default {
  findUnique
};
