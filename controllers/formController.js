import { pool } from "../config/db.js";
import jwtAuth from "../utilities/jwtAuth.js";

export const createForm = async (req, res) => {
    const {token, form_title, form_description, questions} = req.body
    const tokenStatus = jwtAuth(token)
    if (tokenStatus.state === "invalid"){
        return res.status(401).json({status:"invalid", message:"Invalid Token"})
    }
    //const data = tokenStatus.payload.user

    try {
        const user_id = parseInt(tokenStatus.payload.user)
        // Add a row to the forms table
        const form = await pool.query('INSERT INTO forms(title, description,is_published, user_id) VALUES($1,$2,$3,$4) RETURNING *',
            [form_title, form_description, false, user_id]
        )
        for (const key in questions){
            const {title, type, required} = questions[key]
            console.log(title, type, required)
        }
        res.status(200).json({message:"Form Created Successfully", data:form.rows[0], questions: questions})
    } catch (error) {
        
    }
}