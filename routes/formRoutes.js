import { Router } from "express";
import { createForm } from "../controllers/formController.js";

const formRouter = Router()

formRouter.post("/create-form", createForm)


export default formRouter