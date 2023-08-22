exports.createClassroom = (req, res) => {
    const { classroom_name, class_teacher_id } = req.body;
    const query = 'INSERT INTO classrooms (classroom_name, class_teacher_id) VALUES (?, ?)';
  
    req.db.query(query, [classroom_name, class_teacher_id], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json({ message: 'Classroom created successfully' });
      }
    });
  };
  
  exports.getAllClassrooms = (req, res) => {
    const query = 'SELECT * FROM classrooms';
  
    req.db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json(results);
      }
    });
  };
  
  exports.updateClassroom = (req, res) => {
    const classroomId = req.params.id;
    const { classroom_name, class_teacher_id } = req.body;
    const query = 'UPDATE classrooms SET classroom_name = ?, class_teacher_id = ? WHERE classroom_id = ?';
  
    req.db.query(query, [classroom_name, class_teacher_id, classroomId], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json({ message: 'Classroom updated successfully' });
      }
    });
  };
  
  exports.deleteClassroom = (req, res) => {
    const classroomId = req.params.id;
    const query = 'DELETE FROM classrooms WHERE classroom_id = ?';
  
    req.db.query(query, [classroomId], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json({ message: 'Classroom deleted successfully' });
      }
    });
  };
  
  // controllers/classroomsController.js

exports.getClassroomById = (req, res) => {
    const classroomId = req.params.id;
    const query = 'SELECT * FROM classroom WHERE classroom_id = ?';
  
    req.db.query(query, [classroomId], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        if (result.length === 0) {
          res.status(404).json({ error: 'Classroom not found' });
        } else {
          res.json(result[0]);
        }
      }
    });
  };
  