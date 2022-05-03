import supertest from "supertest";
import app from "../../src/app.js";
import userBodyFactory from "./userBodyFactory.js";
import userFactory from "./userFactory.js";

export default async function tokenFactory() {
    const body = userBodyFactory();
    await userFactory(body);

    const res = await supertest(app).post("/sign-in").send(body);
    const token = res.body.token;
    
    return token
}