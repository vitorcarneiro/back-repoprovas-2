import { CreateTestData } from "../../src/services/testService";

export default function testBodyFactory(): CreateTestData {
  return {
    name: 'Test test 123456789',
    pdfUrl: 'https://www.orimi.com/pdf-test.pdf',
    categoryId: 1,
    teacherDisciplineId: 1
  };
}