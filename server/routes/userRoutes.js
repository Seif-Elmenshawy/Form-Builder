import { Router } from "express";
import { createUser, loginUser, authUser, deleteUser } from "../controllers/userControllers.js";


const userRouter = Router()

userRouter.get('/test', (req, res) => {
  res.send("The first router")
})
userRouter.post('/sign-up', createUser);
userRouter.post('/log-in', loginUser)
userRouter.get('/auth', authUser)
userRouter.delete('/delete', deleteUser)

export default userRouter
