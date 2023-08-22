const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Query user by email
  const query = 'SELECT * FROM users WHERE email = ?';
  req.db.query(query, [email], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      if (results.length === 0) {
        res.status(401).json({ error: 'Authentication failed' });
      } else {
        const user = results[0];
        
        // Compare the hashed password
        bcrypt.compare(password, user.password, (bcryptErr, bcryptRes) => {
          if (bcryptErr) {
            res.status(500).json({ error: 'Authentication error' });
          } else if (bcryptRes) {
            console.log(user.role)
            // Passwords match, generate token
            const token = generateToken(user.uid, user.role);
            res.json({ message: 'Authentication successful', token, role: user.role, uid: user.uid });
          } else {
            res.status(401).json({ error: 'Authentication failed' });
          }
        });
      }
    }
  });
};

// Function to generate JWT token
function generateToken(userId, role) {
  const token = jwt.sign(
    { userId, role },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );
  return token
}
