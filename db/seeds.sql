INSERT INTO departments (department_name)
VALUES  ("Management"),
        ("Field"),
        ("Finance"),
        ("Communications");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Campaign Manager", 120000, 1),
        ("Field Director", 72000, 2),
        ("Deputy Field Director", 60000, 3),
        ("Field Organizer", 48000, 4),
        ("Finance Director", 72000, 5),
        ("Deputy Finance Director", 60000, 6),
        ("Communications Director", 72000, 7),
        ("Press Secretary", 60000, 8);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  (Dave, Miranda, 1),
        (Jorge, Contreras, 2, 1),
        (Michael, Mahon, 3, 2),
        (Lauren, Wilson, 3, 2),
        (Heather, Meyer, 4, 3),
        (Dan, Osman, 4, 3),
        (Cole, Robinson, 4, 3),
        (Linda, Featherston, 4, 3),
        (Jessie, White, 4, 4),
        (Rebecca, Hollister, 4, 4),
        (Nikki, Richardson, 4, 4),
        (Andrew, Davis, 4, 4),
        (Ben, Meers, 5, 1),
        (David, Stabler, 6, 13),
        (Monica, Heth, 6, 13),
        (Nazy, Hosseini, 6, 13),
        (Ashley, All, 7, 1),
        (Joe, Rogan, 8, 17),
        (Karina, Barrett, 8, 17),
