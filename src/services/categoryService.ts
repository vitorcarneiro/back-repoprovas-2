import categoryRepository from "../repositories/categoryRepository.js";

async function findMany() {
  return categoryRepository.findMany();
}

async function findUnique(id: number) {
  return categoryRepository.findUnique(id);
}

export default {
  findMany,
  findUnique
};
