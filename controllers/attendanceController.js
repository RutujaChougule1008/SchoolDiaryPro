// controllers/attendanceController.js

const db = require('../db');

exports.recordAttendance = (req, res) => {
  const { student_id, attendance_date, is_present } = req.body;
  const query = 'INSERT INTO attendance (student_id, attendance_date, is_present) VALUES (?, ?, ?)';

  db.query(query, [student_id, attendance_date, is_present], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json({ message: 'Attendance recorded successfully' });
    }
  });
};

// Implement other CRUD functions for attendance similarly
