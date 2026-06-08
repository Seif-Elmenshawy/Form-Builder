import { Router } from "express";
import { createUser, loginUser, authUser, deleteUser } from "../controllers/userControllers.js";


const userRouter = Router()

userRouter.get('/test', (req, res)=>{
    res.send("The first router")
})
//Create User Route
userRouter.post('/sign-up', createUser);

//LogIn User Route
userRouter.post('/log-in', loginUser)

//Auth User Route
userRouter.get('/auth', authUser)

//Delete User Route
userRouter.delete('/delete', deleteUser)

export default userRouter