import { Request, Response } from "express";
import testService, { CreateTestData } from "../services/testService.js";

async function find(req: Request, res: Response) {
  const { groupBy } = req.query as { groupBy: string };

  if (groupBy !== "disciplines" && groupBy !== "teachers") {
    return res.sendStatus(400);
  }

  const tests = await testService.find({ groupBy });
  res.send({ tests });
}

async function infoToCreate(req: Request, res: Response) {
  const testsInfos = await testService.getInfo();

  res.send({ testsInfos });
}

async function create(req: Request, res: Response) {
  const test = req.body;

  await testService.create(test);

  res.sendStatus(201);
}


export default {
  find,
  infoToCreate,
  create
};
