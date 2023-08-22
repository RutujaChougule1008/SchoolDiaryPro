// src/controllers/usersController.js
const jwt = require('jsonwebtoken'); // Import JWT library
const secretKey = 'your-secret-key'; 
const bcrypt = require('bcrypt'); // Import the bcrypt library

// Controller function to get all users
exports.getAllUsers = (req, res) => {
  if(req.user.role!=="admin"){
    res.status(500).json({ error: 'You dont have access!' });
}
  const query = 'SELECT * FROM users WHERE isActive = true';
  req.db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
};

  
  exports.createUser = (req, res) => {
    const { email, password, role, name } = req.body;
  
    // Hash the password
    if(req.user.role!=="admin"){
      res.status(500).json({ error: 'You dont have access!' });
}

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        res.status(500).json({ error: 'Password hashing error' });
      } else {
        const query = 'INSERT INTO users (email, password, role, name) VALUES (?, ?, ?, ?)';
  
        req.db.query(query, [email, hashedPassword, role, name], (err, userResult) => {
          if (err) {
            res.status(500).json({ error: err });
          } else {
            const userId = userResult.insertId;
            console.log(userId)
            if (role === 'parent') {
              // Insert user into parents table
              const parentQuery = 'INSERT INTO parents (parent_name, parent_email, user_id) VALUES (?, ?, ?)';
              req.db.query(parentQuery, [name, email, userId], (err, parentResult) => {
                if (err) {
                  res.status(500).json({ error: 'Database error' });
                } else {
                  res.json({ message: 'User (parent) added successfully' });
                }
              });
            } else if (role === 'student') {
              // Insert user into students table
              const studentQuery = 'INSERT INTO students (user_id) VALUES (?)';
              req.db.query(studentQuery, [userId], (err, studentResult) => {
                if (err) {
                  res.status(500).json({ error: err });
                } else {
                  res.json({ message: 'User (student) added successfully' });
                }
              });
            } else {
              res.json({ message: 'User added successfully' });
            }
          }
        });
      }
    });
  };
  
// Function to generate JWT token
function generateToken(userId, role) {
  const payload = { userId, role };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
}



  exports.updateUser = (req, res) => {
    const userId = req.params.id; // Assuming you're using route parameters and "uid" as the parameter name
    const { email, password, role } = req.body; // Updated field names
    const query = 'UPDATE users SET email = ?, password = ?, role = ? WHERE uid = ?'; // Table name should be "user" instead of "users"
     if(req.user.role!=="admin"){
      res.status(500).json({ error: 'You dont have access!' });
}

    req.db.query(query, [email, password, role, userId], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json({ message: 'User updated successfully' });
      }
    });
  };
  
  exports.deleteUser = (req, res) => {
    if(req.user.role!=="admin"){
      res.status(500).json({ error: 'You dont have access!' });
}
    const userId = req.params.id
    const query = 'UPDATE users SET isActive = false WHERE uid = ?';
    
    req.db.query(query, [userId], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json({ message: 'User deactivated successfully' });
      }
    });
  };
  
  