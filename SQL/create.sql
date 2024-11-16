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

-- EXAMPLE FUNCTION CALL
SELECT create_department('Computer Science', 'Dr. Smith');

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

-- EXAMPLE FUNCTION CALL
SELECT create_major('Computer Science', 1, 120, 'Bachelor''s');

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