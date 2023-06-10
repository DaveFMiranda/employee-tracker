-- View all departments --
SELECT * FROM departments;

-- View all roles --
SELECT roles.id, roles.title, roles.salary, departments.department_name FROM roles 
INNER JOIN departments ON roles.department_id = departments.id;

-- View all employees --
SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees 
INNER JOIN roles ON employees.role_id = roles.id
INNER JOIN departments ON roles.department_id = departments.id 
LEFT JOIN employees AS manager ON employees.manager_id = manager.id;

-- Add department --
INSERT INTO departments (department_name) VALUES ("Advance")

-- Add role --
INSERT INTO roles (new_title, salary, department_id) VALUES ("Advance Director", 72000, 5);

-- Add employee --
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (Zach, Helder, 9, 1);

-- Update employee role --
UPDATE employees SET role_id = 1 WHERE id = 20;
