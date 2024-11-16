-- CREATE DEPARTMENT TABLE
CREATE TABLE Department (
    department_ID SERIAL PRIMARY KEY,
    department_title VARCHAR(100),
    department_head VARCHAR(100)
);

-- CREATE MAJOR TABLE
CREATE TABLE Major (
    major_title VARCHAR(100) PRIMARY KEY,
    department_ID INT NOT NULL REFERENCES Department(department_ID),
    total_hours INT,
    degree_type VARCHAR(50)
);

-- CREATE STAFF TABLE
CREATE TABLE Staff (
    staff_ID SERIAL PRIMARY KEY,
    department_ID INT NOT NULL REFERENCES Department(department_ID),
    date_hired DATE,
    SSN VARCHAR(9) UNIQUE,
    pass_hash CHAR(64),
    birth_date DATE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(10)
);

-- CREATE ADVISOR TABLE
CREATE TABLE Advisor (
    advisor_ID SERIAL PRIMARY KEY,
    department_ID INT NOT NULL REFERENCES Department(department_ID),
    date_hired DATE,
    SSN VARCHAR(9) UNIQUE,
    pass_hash CHAR(64),
    birth_date DATE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(10)
);

-- CREATE INSTRUCTOR TABLE
CREATE TABLE Instructor (
    instructor_ID SERIAL PRIMARY KEY,
    department_ID INT NOT NULL REFERENCES Department(department_ID),
    date_hired DATE,
    SSN CHAR(9) UNIQUE,
    pass_hash CHAR(64),
    birth_date DATE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(10)
);

-- CREATE STUDENT TABLE
CREATE TABLE Student (
    student_ID SERIAL PRIMARY KEY,
    major_title VARCHAR(100) NOT NULL REFERENCES Major(major_title),
    date_enrolled DATE,
    SSN CHAR(9) UNIQUE,
    pass_hash CHAR(64),
    birth_date DATE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(10),
    student_type VARCHAR(20),
    year_level VARCHAR(20),
    grad_date DATE,
    credits INT,
    GPA NUMERIC(3, 2)
);

-- CREATE ENROLLMENT TABLE
CREATE TABLE Enrollment (
    course_ID INT NOT NULL,
    student_ID INT NOT NULL,
    PRIMARY KEY (course_ID, student_ID),
    FOREIGN KEY (course_ID) REFERENCES Course(course_ID),
    FOREIGN KEY (student_ID) REFERENCES Student(student_ID)
);

-- CREATE ADVISEMENT TABLE
CREATE TABLE Advisement (
    advisor_ID INT NOT NULL,
    major_title VARCHAR(100) NOT NULL,
    PRIMARY KEY (advisor_ID, major_title),
    FOREIGN KEY (advisor_ID) REFERENCES Advisor(advisor_ID),
    FOREIGN KEY (major_title) REFERENCES Major(major_title)
);