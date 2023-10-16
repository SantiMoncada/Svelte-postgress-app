CREATE TABLE USERS (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE CLIENTS (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    status BOOLEAN NOT NULL,
    lastlogin TIMESTAMP
);

CREATE TABLE PAYMENTS (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    paid_status BOOLEAN NOT NULL,
    paid_date DATE,
    client_id INT REFERENCES CLIENTS(id)
);

CREATE TABLE TASK (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    color VARCHAR(50),
    user_id INT REFERENCES USERS(id)
);


INSERT INTO USERS ( name, email, password) VALUES
    ('admin', 'admin@email.com', '$2b$10$p5rSZREdZS/eIjUL3QpKTeBt55otuNewNxb7S3xAoNw3QMMFihNoW');

INSERT INTO CLIENTS (name, email, status, lastlogin) VALUES
    ('John Smith', 'john.smith@example.com', TRUE, '2023-10-14 09:30:00'),
    ('Sarah Johnson', 'sarah.johnson@example.com', FALSE, '2023-10-13 15:45:00'),
    ('Michael Williams', 'michael.williams@example.com', TRUE, '2023-10-13 11:20:00'),
    ('Emily Brown', 'emily.brown@example.com', TRUE, '2023-10-14 14:15:00'),
    ('Robert Davis', 'robert.davis@example.com', FALSE, '2023-10-12 17:10:00'),
    ('Jennifer Lee', 'jennifer.lee@example.com', TRUE, '2023-10-14 10:25:00'),
    ('William Johnson', 'william.johnson@example.com', TRUE, '2023-10-13 19:50:00'),
    ('Sophia Miller', 'sophia.miller@example.com', FALSE, '2023-10-14 08:30:00'),
    ('Matthew Wilson', 'matthew.wilson@example.com', TRUE, '2023-10-13 22:15:00'),
    ('Olivia Martinez', 'olivia.martinez@example.com', FALSE, '2023-10-14 12:45:00'),
    ('James Anderson', 'james.anderson@example.com', TRUE, '2023-10-12 13:55:00'),
    ('Emma Harris', 'emma.harris@example.com', TRUE, '2023-10-14 16:20:00'),
    ('Daniel Clark', 'daniel.clark@example.com', FALSE, '2023-10-13 14:05:00'),
    ('Ava Johnson', 'ava.johnson@example.com', TRUE, '2023-10-12 18:40:00'),
    ('Alexander Taylor', 'alexander.taylor@example.com', TRUE, '2023-10-14 11:30:00'),
    ('Mia Robinson', 'mia.robinson@example.com', FALSE, '2023-10-13 10:10:00'),
    ('Ethan Hall', 'ethan.hall@example.com', TRUE, '2023-10-14 13:15:00'),
    ('Chloe Scott', 'chloe.scott@example.com', TRUE, '2023-10-12 20:20:00'),
    ('Liam White', 'liam.white@example.com', FALSE, '2023-10-13 09:25:00'),
    ('Grace Brown', 'grace.brown@example.com', TRUE, '2023-10-14 07:40:00');

INSERT INTO PAYMENTS (amount, paid_status, paid_date, client_id) VALUES
    (90.00, TRUE, '2023-10-20', 1),
    (60.75, TRUE, '2023-10-25', 2),
    (180.50, TRUE, '2023-10-19', 3),
    (70.25, TRUE, '2023-10-27', 4),
    (250.00, TRUE, '2023-10-18', 5),
    (150.75, FALSE, '2023-10-30', 6),
    (95.00, FALSE, '2023-10-21', 7),
    (75.50, FALSE, '2023-10-28', 8),
    (140.25, FALSE, '2023-10-22', 9),
    (110.00, FALSE, '2023-10-29', 10),
    (100.00, FALSE, '2023-10-01', 11),
    (75.50, FALSE, '2023-10-10', 1),
    (150.25, FALSE, '2023-10-05', 2),
    (50.00, FALSE, '2023-10-12', 13),
    (200.75, FALSE, '2023-10-03', 14),
    (125.00, TRUE, '2023-10-14', 15),
    (80.50, TRUE, '2023-10-07', 16),
    (60.25, TRUE, '2023-10-15', 20),
    (120.00, TRUE, '2023-10-04', 4),
    (95.75, TRUE, '2023-10-11', 7);

