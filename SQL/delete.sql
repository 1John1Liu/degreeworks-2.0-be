-- DELETE DEPARTMENT
CREATE OR REPLACE FUNCTION delete_department(
    p_department_ID INT
)
RETURNS VOID AS
$$
BEGIN
    DELETE FROM Department
    WHERE department_ID = p_department_ID;
END;
$$ LANGUAGE plpgsql;

-- DELETE MAJOR
CREATE OR REPLACE FUNCTION delete_major(
    p_major_title VARCHAR(100)
)
RETURNS VOID AS
$$
BEGIN
    DELETE FROM Major
    WHERE major_title = p_major_title;
END;
$$ LANGUAGE plpgsql;

-- DELETE INSTRUCTOR
CREATE OR REPLACE FUNCTION delete_instructor(
    p_instructor_id INT
)
RETURNS VOID AS
$$
BEGIN
    DELETE FROM Instructor
    WHERE instructor_ID = p_instructor_id;
END;
$$ LANGUAGE plpgsql;

-- DELETE STAFF
CREATE OR REPLACE FUNCTION delete_staff(
    p_staff_id INT
)
RETURNS VOID AS
$$
BEGIN
    DELETE FROM Staff
    WHERE staff_ID = p_staff_id;
END;
$$ LANGUAGE plpgsql;


-- DELETE COURSE
CREATE OR REPLACE FUNCTION delete_course(
    p_course_id INT
)
RETURNS VOID AS
$$
BEGIN
    DELETE FROM Course
    WHERE course_id = p_course_id;
END;
$$ LANGUAGE plpgsql;