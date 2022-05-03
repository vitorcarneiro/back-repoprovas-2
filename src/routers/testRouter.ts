import { Router } from "express";
import testController from "../controllers/testController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { testSchema } from "../schemas/testSchema.js";


const testRouter = Router();

testRouter.get(
    "/tests",
    ensureAuthenticatedMiddleware,
    testController.find
);

testRouter.get(
    "/tests/info",
    ensureAuthenticatedMiddleware,
    testController.infoToCreate
);

testRouter.post(
    "/tests/create",
    validateSchemaMiddleware(testSchema),
    ensureAuthenticatedMiddleware,
    testController.create
);

testRouter.patch(
    "/tests/:testId/addView",
    ensureAuthenticatedMiddleware,
    testController.addView
);

export default testRouter;