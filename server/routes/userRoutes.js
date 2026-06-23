import { Router } from "express";
import { createUser, loginUser, authUser, deleteUser } from "../controllers/userControllers.js";
import jwtAuth from "../utilities/jwtAuth.js"

const userRouter = Router()

userRouter.get('/test', (req, res) => {
  res.send("The first router")
})
userRouter.post('/sign-up', createUser);
userRouter.post('/log-in', loginUser)
userRouter.get('/auth', jwtAuth, authUser)
userRouter.delete('/delete', deleteUser)

export default userRouter
