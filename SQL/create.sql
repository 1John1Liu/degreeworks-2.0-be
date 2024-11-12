-- Create Staff table
CREATE TABLE Staff(staff_ID serial PRIMARY KEY,date_hired date,SSN character varying(9) unique,birth_date date,first_name character varying(50),last_name character varying(50),email character varying(100) unique,phone character varying(10));

-- Create Advisor table
CREATE TABLE Advisor(advisor_ID serial PRIMARY KEY,date_hired date,SSN character varying(9) unique ,birth_date date,first_name character varying(50),last_name character varying(5
0),email character varying(100) unique ,phone character varying(10));

--Create Course table
CREATE TABLE Course (course_ID SERIAL PRIMARY KEY,course_title VARCHAR(50),course_prefix VARCHAR(10),course_number INT,credit INT,semester VARCHAR(10),year INT,method VARCHAR(20),days VARCHAR(20),start_time TIME,end_time TIME,seats_cap INT,seats_available INT);

--Create Student table
CREATE TABLE Student (student_ID SERIAL PRIMARY KEY,date_enrolled DATE,SSN CHAR(9) UNIQUE,birth_date DATE,first_name VARCHAR(50),last_name VARCHAR(50),email VARCHAR(100) UNIQUE,phone VARCHAR(10),student_type VARCHAR(20),year_level VARCHAR(20),grad_date DATE,credits INT,GPA NUMERIC(3, 2));

--Create Enrollment table
CREATE TABLE Enrollment (course_ID INT,student_ID INT,PRIMARY KEY (course_ID, student_ID),FOREIGN KEY (course_ID) REFERENCES Course(course_ID),FOREIGN KEY (student_ID) REFERENCES Student(student_ID));

--Create Instructor table
CREATE TABLE Instructor (instructor_ID SERIAL PRIMARY KEY,course_ID INT NOT NULL REFERENCES Course(course_ID),date_hired DATE,SSN CHAR(9) UNIQUE,birth_date DATE,first_name VARCHAR(50),last_name VARCHAR(50),email VARCHAR(100) UNIQUE,phone VARCHAR(10));

--Create Major table
CREATE TABLE Major (major_title VARCHAR(100) PRIMARY KEY,course_ID INT NOT NULL REFERENCES Course(course_ID),student_ID INT NOT NULL REFERENCES Student(student_ID),total_hours INT,degree_type VARCHAR(50));

--Create Department table
CREATE TABLE Department (department_ID SERIAL PRIMARY KEY,major_title VARCHAR(100) NOT NULL REFERENCES Major(major_title),advisor_id INT NOT NULL REFERENCES Advisor(advisor_ID), staff_id INT NOT NULL REFERENCES Staff(staff_ID), instructor_id INT NOT NULL REFERENCES Staff(staff_ID), department_title VARCHAR(100), department_head VARCHAR(100));
