import { Test } from "@prisma/client";
import testRepository from "../repositories/testRepository.js";
import categoryService from "../services/categoryService.js";
import disciplineService from "../services/disciplineService.js";
import teacherService from "../services/teacherService.js";

interface Filter {
  groupBy: "disciplines" | "teachers";
}

export type CreateTestData = Omit<Test, "id"|"views">;

async function find(filter: Filter) {
  if (filter.groupBy === "disciplines") {
    return testRepository.getTestsByDiscipline();
  } else if (filter.groupBy === "teachers") {
    return testRepository.getTestsByTeachers();
  }
}

async function getInfo() {
  const categories = await categoryService.findMany();
  const teachersDisciplines = await testRepository.getTeachersDisciplines();
  
  return { categories, teachersDisciplines };
}

async function create(createTestData: CreateTestData) {
  testRepository.insert(createTestData);
}

export default {
  find,
  create,
  getInfo
};