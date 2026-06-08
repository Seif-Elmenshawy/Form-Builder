/*CREATE USERS TABLE*/
CREATE TABLE choices(
    id UUID PRIMARY KEY DEFAULT get_random_uuid(),
    choice_title TEXT NOT NULL,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE
);
CREATE TABLE users(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


/*CREATE FORMS TABLE*/
CREATE TABLE forms(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_title TEXT NOT NULL,
    description TEXT,
    is_published BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE
);

/*CREATE QUESTIONS TABLE*/
CREATE TABLE questions(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_title TEXT NOT NULL,
    type TEXT NOT NULL,
    require BOOLEAN NOT NULL,
    form_id UUID REFERENCES forms(id) ON DELETE CASCADE
);


/* CREATE CHOICES TABLE */

SELECT * FROM usersINNER JOIN forms on users.id = forms.user_id
INNER JOIN questions on forms.id = questions.form_id
INNER JOIN choices on qustions.id = choices.question_id;


/* CREATE SUBMISSIONS TABLE */
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  form_id UUID REFERENCES forms(id) ON DELETE CASCADE
);

/* CREATE ANSWERES TABLE */
CREATE TABLE answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  value TEXT NOT NULL,
  answer_type TEXT NOT NULL
);
