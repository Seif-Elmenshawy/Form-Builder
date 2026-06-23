import { pool } from "../config/db.js";
import jwtAuth from "../utilities/jwtAuth.js";

export const createForm = async (req, res) => {

  const { form_title, form_description, questions } = req.body

  try {
    const user_id = req.body.user
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


  try {
    const userId = req.user.user;
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
    const status = await pool.query("SELECT * FROM forms WHERE forms.id = $1", [formId])
    if (status.rows.length == 0) {
      return res.status(404).json({ status: "failed", message: "Form not found" })
    }
    const form = await pool.query(`SELECT forms.form_title, forms.is_published, forms.description, questions.question_title, questions.type,
      questions.require, choices.choice_title FROM forms INNER JOIN questions on questions.form_id = forms.id LEFT JOIN choices on 
      choices.question_id = questions.id WHERE forms.id = $1`, [formId])
    res.json({ data: form.rows })
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

export const submitForms = async (req, res) => {
  try {
    const { answers } = req.body
    const formId = req.params.formId
    const status = await pool.query(`SELECT * FROM forms WHERE forms.id = $1`, [formId])
    if (status.rows.length == 0) {
      return res.status(404).json({ status: "failed", message: "Form not Found" })
    }
    const submission = await pool.query(`INSERT INTO submissions(form_id) VALUES($1) RETURNING *`, [formId])
    const submission_id = await submission.rows[0].id
    for (const q in answers) {
      const { value, question_id } = answers[q]
      const question = await pool.query(`SELECT * FROM questions WHERE id = $1`, [question_id])
      const question_type = await question.rows[0].type
      const answer = await pool.query(`INSERT INTO answers(value, question_id, answer_type, submission_id) VALUES($1, $2, $3, $4) RETURNING *`, [value, question_id, question_type, submission_id])
      console.log(answer.rows[0])
    }
    return res.status(200).json({ state: "Success", message: "Form Submitted Successfully", data: answers })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

export const getAnswers = async (req, res) => {
  try {
    const formId = req.params.formId

    const userId = req.user.user

    const form = await pool.query(`SELECT * FROM forms WHERE forms.id = $1`, [formId])
    if (form.rows.legnth == 0) {
      return res.status(404).json({ state: "Failed", message: "The form is not available" })
    }

    if (form.rows[0].user_id != userId) {
      return res.status(402).json({ message: "You are not authorized to view this page" })
    }

    const answers = await pool.query(`SELECT * FROM submissions INNER JOIN answers on submissions.id = answers.submission_id WHERE submissions.form_id = $1`, [formId])

    return res.status(200).json({ message: "Form Fetched Successfully", data: answers.rows })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" })
  }


}
