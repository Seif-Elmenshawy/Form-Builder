import { Router } from "express";
import { createForm, getforms, openform, submitForms, getAnswers } from "../controllers/formController.js";
import jwtAuth from "../utilities/jwtAuth.js"

const formRouter = Router()

formRouter.post("/create-form", jwtAuth, createForm)
formRouter.get("/get-forms", jwtAuth, getforms)
formRouter.get("/open-form/:formId", openform)
formRouter.post("/submit-form/:formId", submitForms)
formRouter.get("/get-responses/:formId", jwtAuth, getAnswers)

export default formRouter
