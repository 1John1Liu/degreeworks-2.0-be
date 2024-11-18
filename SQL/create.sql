-- CREATE DEPARTMENT
CREATE OR REPLACE FUNCTION create_department(
    p_department_title VARCHAR(100),
    p_department_head VARCHAR(100)
)
RETURNS VOID AS
$$
BEGIN
    INSERT INTO Department (department_title, department_head)
    VALUES (p_department_title, p_department_head);
END;
$$ LANGUAGE plpgsql;

-- CREATE MAJOR
CREATE OR REPLACE FUNCTION create_major(
    p_major_title VARCHAR(100),
    p_department_ID INT,
    p_total_hours INT,
    p_degree_type VARCHAR(50)
)
RETURNS VOID AS
$$
BEGIN
    INSERT INTO Major (major_title, department_ID, total_hours, degree_type)
    VALUES (p_major_title, p_department_ID, p_total_hours, p_degree_type);
END;
$$ LANGUAGE plpgsql;

-- CREATE INSTRUCTOR
CREATE OR REPLACE FUNCTION create_instructor(
    p_department_ID INT,
    p_date_hired DATE,
    p_SSN CHAR(9),
    p_birth_date DATE,
    p_first_name VARCHAR(50),
    p_last_name VARCHAR(50),
    p_email VARCHAR(100),
    p_phone CHAR(10),
    p_pass_hash VARCHAR(255)
)
RETURNS VOID AS
$$
BEGIN
    INSERT INTO Instructor (department_ID, date_hired, SSN, birth_date, first_name, last_name, email, phone, pass_hash)
    VALUES (p_department_ID, p_date_hired, p_SSN, p_birth_date, p_first_name, p_last_name, p_email, p_phone, p_pass_hash);
END;
$$ LANGUAGE plpgsql;

-- CREATE COURSE
CREATE OR REPLACE FUNCTION create_course(
    p_major_title VARCHAR(100),
    p_instructor_ID INT,
    p_course_title VARCHAR(50),
    p_course_prefix VARCHAR(10),
    p_course_number INT,
    p_credit INT,
    p_semester VARCHAR(10),
    p_year INT,
    p_method VARCHAR(20),
    p_days VARCHAR(20),
    p_start_time TIME,
    p_end_time TIME,
    p_seats_cap INT,
    p_seats_available INT
)
RETURNS VOID AS
$$
BEGIN
    INSERT INTO Course (
        major_title, instructor_ID, course_title, course_prefix, 
        course_number, credit, semester, year, method, days, 
        start_time, end_time, seats_cap, seats_available
    )
    VALUES (
        p_major_title, p_instructor_ID, p_course_title, p_course_prefix, 
        p_course_number, p_credit, p_semester, p_year, p_method, p_days, 
        p_start_time, p_end_time, p_seats_cap, p_seats_available
    );
END;
$$ LANGUAGE plpgsql;

-- CREATE STAFF
CREATE OR REPLACE FUNCTION create_staff(
    p_department_ID INT,
    p_date_hired DATE,
    p_SSN CHAR(9),
    p_birth_date DATE,
    p_first_name VARCHAR(50),
    p_last_name VARCHAR(50),
    p_email VARCHAR(100),
    p_phone CHAR(10),
    p_pass_hash VARCHAR(255)
)
RETURNS VOID AS
$$
BEGIN
    INSERT INTO Staff (department_ID, date_hired, SSN, birth_date, first_name, last_name, email, phone, pass_hash)
    VALUES (p_department_ID, p_date_hired, p_SSN, p_birth_date, p_first_name, p_last_name, p_email, p_phone, p_pass_hash);
END;
$$ LANGUAGE plpgsql;

-- MATERIALIZED VIEW OF LOGINS
CREATE MATERIALIZED VIEW user_logins AS
SELECT 
    staff_ID AS user_ID,
    pass_hash,
    'staff' AS role
FROM Staff
UNION ALL
SELECT 
    instructor_ID AS user_ID,
    pass_hash,
    'instructor' AS role
FROM Instructor
UNION ALL
SELECT 
    advisor_ID AS user_ID,
    pass_hash,
    'advisor' AS role
FROM Advisor
UNION ALL
SELECT 
    student_ID AS user_ID,
    pass_hash,
    'student' AS role
FROM Student;