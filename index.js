const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL server");
});

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "task",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Quit",
        ],
      },
    ])
    .then((answers) => {
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
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateRole();
          break;
        default:
          quit();
      }
    });
}

function quit() {
  console.log("Exiting the employee tracker...");
  process.exit(0);
}

function showDepartments() {
  db.query(`SELECT * FROM departments;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    init();
  });
  console.log("Departments shown");
}

function showRoles() {
  db.query(
    `SELECT roles.id, roles.title, roles.salary, departments.department_name 
    FROM roles 
    INNER JOIN departments ON roles.department_id = departments.id;`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.table(result);
      init();
    }
  );
  console.log("Roles shown");
}

function showEmployees() {
  db.query(
    `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees 
    INNER JOIN roles ON employees.role_id = roles.id
    INNER JOIN departments ON roles.department_id = departments.id 
    LEFT JOIN employees AS manager ON employees.manager_id = manager.id
    ;`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.table(result);
      init();
    }
  );
  console.log("Employees shown");
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the new department?",
        name: "department_name",
      },
    ])
    .then((answers) => {
      db.query(
        `INSERT INTO departments (department_name) VALUES ('${answers.department_name}')`,
        (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log(result);
          console.log("Department added");
          init();
        }
      );
    });
}

function addRole() {
  db.query(`SELECT * FROM departments;`, (err, res) => {
    if (err) {
      console.log(err);
    }
    let department = res.map((dept) => ({
      name: dept.department_name,
      value: dept.id,
    }));

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the new role?",
        },
        {
          type: "number",
          name: "salary",
          message: "What is the salary of the new role?",
        },
        {
          type: "list",
          name: "dept",
          message: "Which department does the new role belong to?",
          choices: department,
        },
      ])
      .then((answers) => {
        db.query(
          `INSERT INTO roles SET ?`,
          {
            title: answers.title,
            salary: answers.salary,
            department_id: answers.dept,
          },
          (err, res) => {
            if (err) throw err;
            console.log(res);
            console.log("Role added");
            init();
          }
        );
      });
  });
}

function addEmployee() {
  db.query(`SELECT * FROM roles;`, (err, res) => {
    if (err) {
      console.log(err);
    }
    let role = res.map((role) => ({
      name: role.title,
      value: role.id,
    }));

    db.query(`SELECT * FROM employees`, (err, res) => {
      if (err) {
        console.log(err);
      }
      managers = res.map((manager) => ({
        name: manager.first_name + " " + manager.last_name,
        value: manager.id,
      }));
      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "What is the new employee's first name?",
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the new employee's last name?",
          },
          {
            type: "list",
            name: "role_id",
            message: "What is the new employee's role?",
            choices: role,
          },
          {
            type: "list",
            name: "manager_id",
            message: "Who is the new employee's manager?",
            choices: [...managers, "An employee has no manager"],
          },
        ])
        .then((answers) => {
            const managerId = answers.manager_id === "An employee has no manager" ? null : answers.manager_id;

            db.query(
            `INSERT INTO employees SET ?`,
            {
              first_name: answers.first_name,
              last_name: answers.last_name,
              role_id: answers.role_id,
              manager_id: managerId,
            },
            (err, res) => {
              if (err) throw err;
              console.log("Employee added");
              init();
            }
          );
        });
    });
  });
}

init();
