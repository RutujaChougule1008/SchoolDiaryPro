const db = require('../db');

exports.createExam = (req, res) => {
  const { student_id, marks, subjects, exam_date } = req.body;
  const query = 'INSERT INTO exams (student_id, marks, subjects, exam_date) VALUES (?, ?, ?, ?)';

  db.query(query, [student_id, marks, subjects, exam_date], (err, result) => {
    if (err) {
        console.log(err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json({ message: 'Exam record created successfully' });
    }
  });
};

