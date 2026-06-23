import jwt, { decode } from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()

const jwtAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ state: "invalid", message: "Session Timout, Try Again" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ state: "invalid", message: "Session Timeout, Try Again" })
  }
}

export default jwtAuth
