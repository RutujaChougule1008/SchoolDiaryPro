exports.createStudent = (req, res) => {
    const { classroom_id, user_id } = req.body;
    const query = 'INSERT INTO students (classroom_id, user_id) VALUES (?, ?)';
  
    req.db.query(query, [classroom_id, user_id], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json({ message: 'Student created successfully' });
      }
    });
  };
  
  exports.getAllStudents = (req, res) => {
    const query = 'SELECT * FROM students';
  
    req.db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json(results);
      }
    });
  };
  
  exports.updateStudent = (req, res) => {
    const studentId = req.params.id;
    const { classroom_id, user_id } = req.body;
    const query = 'UPDATE students SET classroom_id = ?, user_id = ? WHERE student_id = ?';
  
    req.db.query(query, [classroom_id, user_id, studentId], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json({ message: 'Student updated successfully' });
      }
    });
  };

  
exports.getStudentById = (req, res) => {
    const studentId = req.params.id;
    const query = 'SELECT * FROM students WHERE student_id = ?';
  
    req.db.query(query, [studentId], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        if (result.length === 0) {
          res.status(404).json({ error: 'Student not found' });
        } else {
          res.json(result[0]);
        }
      }
    });
  };
  
  exports.deleteStudent = (req, res) => {
    const studentId = req.params.id;
    const query = 'DELETE FROM students WHERE student_id = ?';
  
    req.db.query(query, [studentId], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json({ message: 'Student deleted successfully' });
      }
    });
  };
  