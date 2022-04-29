import { Test } from "@prisma/client";
import testRepository from "../repositories/testRepository.js";
import categoryService from "../services/categoryService.js";
import teacherDisciplineService from "../services/teacherDisciplineService.js";
import {
  notFoundError
} from "../utils/errorUtils.js";

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
  const existingCategory = await categoryService.findUnique(createTestData.categoryId)
  if (!existingCategory) throw notFoundError("Category must exist");

  const existingTeacherDiscipline = await teacherDisciplineService.findUnique(createTestData.teacherDisciplineId)
  if (!existingTeacherDiscipline) throw notFoundError("TeacherDiscipline must exist");

  testRepository.insert(createTestData);
}

export default {
  find,
  create,
  getInfo
};