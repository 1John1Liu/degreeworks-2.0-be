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

-- CREATE COURSE TABLE
CREATE TABLE Course (
    course_ID SERIAL PRIMARY KEY,
    major_title VARCHAR(100) NOT NULL REFERENCES Major(major_title),
    instructor_ID INT NOT NULL REFERENCES Instructor(instructor_ID),
    course_title VARCHAR(50),
    course_prefix VARCHAR(10),
    course_number INT,
    credit INT,
    semester VARCHAR(10),
    year INT,
    method VARCHAR(20),
    days VARCHAR(20),
    start_time TIME,
    end_time TIME,
    seats_cap INT,
    seats_available INT
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

-- Add Grade attribute
ALTER TABLE Enrollment
ADD Grade VARCHAR(2); -- Assuming grades like A, B+, etc.

-- Add Year_Taken attribute
ALTER TABLE Enrollment
ADD Year_Taken INT; -- Assuming it stores the year the course was taken (e.g., 2023).

-- Add Semester attribute
ALTER TABLE Enrollment
ADD Semester VARCHAR(10); -- For example, 'Spring', 'Fall', 'Summer'.

-- Add Enrollment_Date attribute
ALTER TABLE Enrollment
ADD Enrollment_Date DATE;