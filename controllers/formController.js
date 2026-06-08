import { pool } from "../config/db.js";
import jwtAuth from "../utilities/jwtAuth.js";

export const createForm = async (req, res) => {
  const { form_title, form_description, questions } = req.body
  const token = req.cookies.token
  const tokenStatus = jwtAuth(token)
  if (tokenStatus.state === "invalid") {
    return res.status(401).json({ status: "invalid", message: "Invalid Token" })
  }
  //const data = tokenStatus.payload.user

  try {
    const user_id = tokenStatus.payload.user
    // Add a row to the forms table
    const form = await pool.query('INSERT INTO forms(form_title, description,is_published, user_id) VALUES($1,$2,$3,$4) RETURNING *',
      [form_title, form_description, false, user_id]
    )
    for (const key in questions) {
      const { title, type, required, choices } = questions[key]
      const question = await pool.query("INSERT INTO questions(question_title, type, require, form_id) VALUES($1, $2, $3, $4) RETURNING *", [title, type, required, form.rows[0].id])

      if (Object.keys(choices).length !== 0) {
        for (const key in choices) {
          const { choiceTitle } = choices[key]
          const choice = await pool.query("INSERT INTO choices(choice_title, question_id) VALUES($1, $2) RETURNING *", [choiceTitle, question.rows[0].id])

        }
      }
    }
    res.status(200).json({ message: "Form Created Successfully", data: form.rows[0], questions: questions })
  } catch (error) {
    console.log("error in creatingForm function", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export const getforms = async (req, res) => {
  const token = req.cookies.token
  const tokenStatus = jwtAuth(token)

  if (tokenStatus.status === "invalid") {
    return res.status(401).json({ state: "invalid", message: "The token is invalid" })
  }

  try {
    const userId = tokenStatus.payload.user;
    const forms = await pool.query("SELECT * FROM forms WHERE user_id = $1", [userId])
    console.log(forms.rows)
    return res.status(200).json({ message: "fetching data succeded", data: forms.rows })
  } catch (error) {
    console.log("Error in fetching the forms function", error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

export const openform = async (req, res) => {
  const formId = req.params.formId
  try {
    // Check if the form available
    const status = await pool.query("SELECT * FROM forms WHERE forms.id = $1", [formId])
    if (status.rows.length == 0) {
      return res.status(404).json({ status: "failed", message: "Form not found" })
    }
    const form = await pool.query(`SELECT forms.form_title, forms.is_published, forms.description, questions.question_title, questions.type,
      questions.require, choices.choice_title FROM forms INNER JOIN questions on questions.form_id = forms.id LEFT JOIN choices on 
      choices.question_id = questions.id WHERE forms.id = $1`, [formId])
    res.json({ data: form.rows })
  } catch (error) {

  }
}

export const submitForms = async () => {
  const answers = req.body
  const formId = req.params.formId
  res.json({ data: answers })
}
