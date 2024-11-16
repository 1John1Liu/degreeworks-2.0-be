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

-- EXAMPLE FUNCTION CALL
--SELECT delete_department(1);

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

-- EXAMPLE FUNCTION CALL
--SELECT delete_major('Computer Science');