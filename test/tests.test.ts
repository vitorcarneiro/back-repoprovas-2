import supertest from "supertest";
import app from "../src/app";
import prisma from "../src/database.js";
import tokenFactory from "./factories/authFactory.js";
import testBodyFactory from "./factories/testFactory";

describe("Test router tests - GET /tests?groupBy=disciplines", () => {
  beforeEach(truncateTests);

  afterAll(disconnect);

  it("should return 401 for a invalid JWT token", async () => {
    const body = {}

    const response = await supertest(app).get("/tests?groupBy=disciplines").send(body).set('Authorization', 'invalid.token.test');

    expect(response.status).toEqual(401);

  });


  it("should return a object for valid JWT token", async () => {
    const body = {}

    const token = await tokenFactory()    
    
    const response = await supertest(app).get("/tests?groupBy=disciplines").send(body).set('Authorization', token);
    
    expect(response.status).toEqual(200);
    expect(typeof response.body).toEqual("object");
  });
});

describe("Test router tests - GET /tests?groupBy=teachers", () => {
  beforeEach(truncateTests);

  afterAll(disconnect);

  it("should return 401 for a invalid JWT token", async () => {
    const body = {}

    const response = await supertest(app).get("/tests?groupBy=teachers").send(body).set('Authorization', 'invalid.token.test');

    expect(response.status).toEqual(401);

  });


  it("should return a object for valid JWT token", async () => {
    const body = {}

    const token = await tokenFactory()    
    
    const response = await supertest(app).get("/tests?groupBy=teachers").send(body).set('Authorization', token);
    
    expect(response.status).toEqual(200);
    expect(typeof response.body).toEqual("object");
  });
});

describe("Test router tests - GET /tests/info", () => {
  beforeEach(truncateTests);

  afterAll(disconnect);

  it("should return 401 for a invalid JWT token", async () => {
    const body = {}

    const response = await supertest(app).get("/tests/info").send(body).set('Authorization', 'invalid.token.test');

    expect(response.status).toEqual(401);

  });


  it("should return a object for valid JWT token", async () => {
    const body = {}

    const token = await tokenFactory()    
    
    const response = await supertest(app).get("/tests/info").send(body).set('Authorization', token);
    
    expect(response.status).toEqual(200);
    expect(typeof response.body).toEqual("object");
  });
});

describe("Test router tests - POST /tests/create", () => {
  beforeEach(truncateTests);

  afterAll(disconnect);

  it("should return 201 and persist the user given a valid body", async () => {
    const body = testBodyFactory();
    const token = await tokenFactory()    

    const response = await supertest(app).post("/tests/create").send(body).set('Authorization', token);
    const test = await prisma.test.findMany({
      where: {
        name: body.name,
        pdfUrl: body.pdfUrl,
        categoryId: body.categoryId,
        teacherDisciplineId: body.teacherDisciplineId
      },
    });

    expect(response.status).toEqual(201);
    expect(test.length).not.toEqual(0);
  });


});


async function disconnect() {
  await prisma.$disconnect();
}

async function truncateTests() {
  await prisma.$executeRaw`TRUNCATE TABLE tests;`;
}