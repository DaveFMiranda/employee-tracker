DAVE UPDATE THIS

1) view all departments (dept. names and IDs)
- view all roles (job title, role id, dept. salary)
2) view all employees (emp id, first, last, title, dept, salary, manager)
3) add department (enter name)
4) add role (enter name, salary, dept)
5) add employee (first, last, role, manager)
6) Update employee role (select employee to update, then new role)

-- View all departments --
SELECT * FROM departments;

-- View all roles --
SELECT * FROM roles;

-- View all employees --
SELECT * FROM employees;
-- ALSO NEED TO MAKE IT SHOW DEPT AND SALARY -- 

-- Add department --
INSERT INTO departments (department_name) VALUES ("Scheduling");

-- Add role --
INSERT INTO roles (title, salary, department_id) VALUES ("Canvasser", 36000, 2);

-- AND EMPLOYEE --
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (Jen, Psaki, 8, 17);

-- Update employee role --
??? (select employee to update, then new role)

UPDATE employees
SET role = "Campaign Manager"
WHERE id = 2;



SELECT movies.movie_name AS movie, reviews.review
FROM reviews
LEFT JOIN movies
ON reviews.movie_id = movies.id
ORDER BY movies.movie_name;