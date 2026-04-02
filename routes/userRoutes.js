import { Router } from "express";
import { createUser, loginUser } from "../controllers/userControllers.js";


const router = Router()

router.get('/test', (req, res)=>{
    res.send("The first router")
})
//Create User Route
router.post('/sign-up', createUser);

//LogIn User Route
router.post('/login', loginUser)

export default router