import Joi from "joi";
import { CreateTestData } from "../services/testService.js";

export const testSchema = Joi.object<CreateTestData>({
    name: Joi.string().min(2).max(30).required(),
    pdfUrl: Joi.string().uri().required(),
    categoryId: Joi.number().required(),
    teacherDisciplineId: Joi.number().required(),
});