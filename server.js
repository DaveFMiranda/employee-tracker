const inquirer = require("inquirer");
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;

let new_department_name;
let role_name;
let salary;
let department_id;
let first_name;
let last_name;
let title;
let manager_id;

// Connect to database

/*
// MYSQL2/PROMISE CONNECTION
async function example1 () {
  const mysql = require('mysql2/promise');
  const conn = await mysql.createConnection({ database: test });
  const [rows, fields] = await conn.execute('select ?+? as sum', [2, 2]);
  await conn.end();
}
*/

// REPLACE THE BELOW WITH THE CONNECTION ABOVE
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



db.connect((err) => {
 if (err) {
  console.error("Error connecting to MySQL:", err);
  return;
 }
 console.log('Connected to MySQL server');

 /*
const createEmployeesDB = `
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;
`;

db.query(createEmployeesDB, (err) => {
  if (err) {
    console.error("Error creating employees database:", err);
    return;
  }
  console.log("Employees database created");
 })

 const createDepartments = `
 CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  new_department_name VARCHAR(30) NOT NULL
)

INSERT INTO departments (new_department_name)
VALUES  ("Management"),
        ("Field"),
        ("Finance"),
        ("Communications")
 `;

 db.query(createDepartments, (err) => {
  if (err) {
    console.error("Error creating departments table:", err);
    return;
  }
  console.log("Departments table created");
 })

 const createRoles = `
 CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  new_title VARCHAR(30) NOT NULL,
  salary DECIMAL[(7 [,0])] NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
)

INSERT INTO roles (new_title, salary, department_id)
VALUES  ("Campaign Manager", 120000, 1),
        ("Field Director", 72000, 2),
        ("Deputy Field Director", 60000, 3),
        ("Field Organizer", 48000, 4),
        ("Finance Director", 72000, 5),
        ("Deputy Finance Director", 60000, 6),
        ("Communications Director", 72000, 7),
        ("Press Secretary", 60000, 8)
 `;

 db.query(createRoles, (err) => {
  if (err) {
    console.error("Error creating roles table:", err);
    return;
  }
  console.log("Roles table created");
 })

 const createEmployees = `
 CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES roles(id),
  FOREIGN KEY (manager_id)
  REFERENCES employees(id)
)

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Dave", "Miranda", 1),
        ("Jorge", "Contreras", 2, 1),
        ("Michael", "Mahon", 3, 2),
        ("Lauren", "Wilson", 3, 2),
        ("Heather", "Meyer", 4, 3),
        ("Dan", "Osman", 4, 3),
        ("Cole", "Robinson", 4, 3),
        ("Linda", "Featherston", 4, 3),
        ("Jessie", "White", 4, 4),
        ("Rebecca", "Hollister", 4, 4),
        ("Nikki", "Richardson", 4, 4),
        ("Andrew", "Davis", 4, 4),
        ("Ben", "Meers", 5, 1),
        ("David", "Stabler", 6, 13),
        ("Monica", "Heth", 6, 13),
        ("Nazy", "Hosseini", 6, 13),
        ("Ashley", "All", 7, 1),
        ("Joe", "Rogan", 8, 17),
        ("Karina", "Barrett", 8, 17)
 `;

 db.query(createEmployees, (err) => {
  if (err) {
    console.error("Error creating employees table:", err);
    return;
  }
  console.log("Employees table created");
 })

 


});
*/
/*
// make it await/async
async function getDepartments () {
  const [departments] = await db.query(`SELECT id, new_department_name FROM departments;`);
  console.table(departments);
  };

  getDepartments();
*/

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
      name: "new_department_name",
      when: (answers) => answers.task === 'Add a department',
    },
    {
      type: "input",
      message: "What is name of the role?",
      name: "new_title",
      when: (answers) => answers.task === 'Add a role',

    },

    {
      type: "number",
      message: "What is the salary of the role?",
      name: "salary",
      when: (answers) => answers.task === 'Add a role',

    },

    {
      type: "list",
      message: "Which department does the role belong to?",
      name: "department",
      choices: () => {
        return new Promise((resolve, reject) => {
          db.query('SELECT id, new_department_name FROM departments', (err, rows) => {
            if (err) {
              reject(err);
            } else {
              const departments = rows.map(row => ({
                name: row.new_department_name,
                value: row.id
              }));
              resolve(departments);
            }
          });
        });
      },
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
  name: "updated_title",
  when: (answers) => answers.task === 'Update an employee role',
},
// LIST OF TITLES

  ])
  .then((answers) => {
    new_department_name = answers.new_department_name;
    role_name = answers.new_title;
    salary = answers.salary;
    department_id = answers.department;
    first_name = answers.first_name;
    last_name = answers.last_name;
    title = answers.title;
    manager_id = answers.manager_id;

    // ADD VARIABLES AND PASS PARAMETERS FOR addEmployee and updateRole
    
    switch (answers.task) {
      case "View all departments":
        showDepartments();
        break;
      case "View all roles":
        showRoles();
        break;
      case "View all employees":
        showEmployees();
        break;
      case "Add a department":
        addDepartment(new_department_name);
        break;
      case "Add a role":
        addRole(role_name, salary, department_id);
      case "Add an employee":
        addEmployee(first_name, last_name, title, manager_id);
      case "Update an employee role":
        updateRole();
      default:
          console.log("Invalid action");
    }
  });

function showDepartments () {
  db.query(`SELECT * FROM departments;`, (err, result) => {
    if (err) {
      console.log(err);
    };
    console.log(result);
  });
  console.log ("Departments shown");
  };

  function showRoles () {
    db.query(`SELECT * FROM roles;`, (err, result) => {
      if (err) {
        console.log(err);
      };
      console.log(result);
    });
    
    
    console.log ("Roles shown");

  };


  function showEmployees () {
    db.query(`SELECT * FROM employees;`, (err, result) => {
      if (err) {
        console.log(err);
      };
      console.log(result);
    });


    console.log ("Employees shown");

  };



  function addDepartment (new_department_name) {
    db.query(`INSERT INTO departments (new_department_name) VALUES ('${new_department_name}')`, (err, result) => {
      if (err) {
        console.log(err);
      };
      console.log(result);
    });
    console.log ("Department added");

  };



  function addRole (role_name, salary, department_id) {
    db.query(`INSERT INTO roles (new_title, salary, department_id) VALUES ("${role_name}", "${salary}", "${department_id}")`, (err, result) => {
      if (err) {
        console.log(err);
      };
      console.log(result);
    });
    console.log ("Role added");

  };


  function addEmployee (first_name, last_name, title, manager_id) {
    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${first_name}", "${last_name}", "${title}", "${manager_id})"`, (err, result) => {
      if (err) {
        console.log(err);
      };
      console.log(result);
    });
    console.log ("Employee added");

  };

  function updateRole () {
    // find the employee ID, return the associated role_id
    // update the role ID
// UPDATE FUNCTION HERE that selects previous info and overwrites it with new role
    console.log ("Role updated");

  };



/*
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
*/
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