
const express = require('express');
require("dotenv").config();
const db = require('./db'); 
const mysql = require('mysql');
const userManagementRoutes = require('./routes/userManagementRoutes');
const classroomRoutes = require('./routes/classroomRoutes');
const studentRoutes = require('./routes/studentRoutes');
const parentRoutes = require('./routes/parentsRoutes');
const authRoutes = require('./routes/authRoutes');
const examRoutes= require('./routes/examRoutes');
const attendanceRoutes= require('./routes/attendanceRoutes');




const authMiddleware = require('./middlewears/authMiddlewear');


const app = express();
const port = 3000;

// Middleware and database connection setup
app.use(express.json());
// ...
app.use((req, res, next) => {
    req.db = db;
    next();
  });
  
app.use('/users',authMiddleware, userManagementRoutes);
app.use('/classrooms',authMiddleware, classroomRoutes);
app.use('/students', studentRoutes);
app.use('/parents', parentRoutes);
app.use('/login', authRoutes);
app.use('/exams',examRoutes );
app.use('/attendance', attendanceRoutes);




// ...

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});