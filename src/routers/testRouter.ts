import { Router } from "express";
import testController from "../controllers/testController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";

const testRouter = Router();

testRouter.get("/tests", ensureAuthenticatedMiddleware, testController.find);
testRouter.get("/tests/info", ensureAuthenticatedMiddleware, testController.getInfoToCreate);
testRouter.get("/tests/create", ensureAuthenticatedMiddleware);

export default testRouter;