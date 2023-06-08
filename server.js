const inquirer = require("inquirer");
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    password: 'password',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "task",
      choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
    },
    {
      type: "input",
      message: "What is the name of the department?",
      name: "department_name",
      when: (answers) => answers.task === 'Add a department',
    },
    {
      type: "input",
      message: "What is name of the role?",
      name: "title",
      when: (answers) => answers.task === 'Add a role',

    },

    {
      type: "number",
      message: "What is the salary of the role?",
      name: "salary",
      when: (answers) => answers.task === 'Add a role',

    },

    {
      type: "input",
      message: "Which department does the role belong to?",
      name: "department",
      when: (answers) => answers.task === 'Add a role',
    },
// HOW CAN I DISPLAY A LIST OF DEPARTMENTS HERE? SHOULD name be department_name or department_id?

{
  type: "input",
  message: "What is the employee's first name?",
  name: "first_name",
  when: (answers) => answers.task === 'Add an employee',
},

{
  type: "input",
  message: "What is the employee's last name?",
  name: "last_name",
  when: (answers) => answers.task === 'Add an employee',
},

{
  type: "input",
  message: "What is the employee's role?",
  name: "title",
  when: (answers) => answers.task === 'Add an employee',
},
// MAKE THIS A LIST OF ROLES/TITLES


{
  type: "input",
  message: "Who is the employee's manager?",
  name: "manager_id",
  when: (answers) => answers.task === 'Add an employee',
},
// MAKE THIS DISPLAY A LIST OF EMPLOYEES TO PICK FROM

{
  type: "input",
  message: "Which employee's role do you want to update?",
  name: "employee_id",
  when: (answers) => answers.task === 'Update an employee role',
},
// LIST OF EMPLOYEES

{
  type: "input",
  message: "What is this employee's new role?",
  name: "title",
  when: (answers) => answers.task === 'Update an employee role',
},
// LIST OF TITLES

  ])
  .then((answers) => {
    // INSERT WHAT HAPPENS TO THE ANSWERS HERE
  });




// UPDATE THIS TO CREATE AN EMPLOYEE
app.post('/api/new-movie', ({ body }, res) => {
  const sql = `INSERT INTO movies (movie_name)
    VALUES (?)`;
  const params = [body.movie_name];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

/* NOTES ON DELETING, QUERYING, WHAT TO PUT AT THE END IF YOUR REQUEST IS INVALID
db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Query database
db.query('SELECT * FROM course_names', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/

/* HERE'S SOME MORE STUFF FROM THE MINI PROJECT
// Read all movies
app.get('/api/movies', (req, res) => {
  const sql = `SELECT id, movie_name AS title FROM movies`;
  
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Delete a movie
app.delete('/api/movie/:id', (req, res) => {
  const sql = `DELETE FROM movies WHERE id = ?`;
  const params = [req.params.id];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
      message: 'Movie not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// Read list of all reviews and associated movie name using LEFT JOIN
app.get('/api/movie-reviews', (req, res) => {
  const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// BONUS: Update review name
app.put('/api/review/:id', (req, res) => {
  const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
  const params = [req.body.review, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Movie not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/