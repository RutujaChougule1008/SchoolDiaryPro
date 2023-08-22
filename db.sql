CREATE TABLE users (
    uid INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'student', 'parent', 'teacher') NOT NULL,
    name VARCHAR(255),
    address VARCHAR(255),
    dob DATE,
    mobile VARCHAR(20),
    isActive BOOLEAN DEFAULT true
);

CREATE TABLE classrooms (
    classroom_id INT AUTO_INCREMENT PRIMARY KEY,
    classroom_name VARCHAR(255) NOT NULL,
    class_teacher_id INT,
    FOREIGN KEY (class_teacher_id) REFERENCES users (uid),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    classroom_id INT,
    FOREIGN KEY (classroom_id) REFERENCES classrooms (classroom_id),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users (uid),
    parent_id INT,
    FOREIGN KEY (parent_id) REFERENCES parents(parent_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE parents (
    parent_id INT AUTO_INCREMENT PRIMARY KEY,
    parent_name VARCHAR(255) NOT NULL,
    parent_email VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (uid)
);

CREATE TABLE exams (
  exam_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  marks INT,
  subjects VARCHAR(255),
  exam_date DATE,
  FOREIGN KEY (student_id) REFERENCES students(student_id)
);


CREATE TABLE attendance (
  attendance_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  attendance_date DATE,
  is_present BOOLEAN,
  FOREIGN KEY (student_id) REFERENCES students(student_id)
);
