import { Router } from "express";
import { createForm, getforms, openform, submitForms, getAnswers } from "../controllers/formController.js";

const formRouter = Router()

formRouter.post("/create-form", createForm)
formRouter.get("/get-forms", getforms)
formRouter.get("/open-form/:formId", openform)
formRouter.post("/submit-form/:formId", submitForms)
formRouter.get("/get-responses/:formId", getAnswers)

export default formRouter
