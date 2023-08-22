// Create a new parent
exports.createParent = (req, res) => {
    const { parent_name, parent_email, user_id } = req.body;
    const query = 'INSERT INTO parents (parent_name, parent_email, user_id) VALUES (?, ?, ?)';
  
    req.db.query(query, [parent_name, parent_email, user_id], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json({ message: 'Parent created successfully' });
      }
    });
  };
  
  // Get all parents
  exports.getAllParents = (req, res) => {
    const query = 'SELECT * FROM parents';
  
    req.db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json(results);
      }
    });
  };
  
  // Get parent by ID
  exports.getParentById = (req, res) => {
    const parentId = req.params.id;
    const query = 'SELECT * FROM parents WHERE parent_id = ?';
  
    req.db.query(query, [parentId], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        if (result.length === 0) {
          res.status(404).json({ error: 'Parent not found' });
        } else {
          res.json(result[0]);
        }
      }
    });
  };
  
  // Update parent
  exports.updateParent = (req, res) => {
    const parentId = req.params.id;
    const { parent_name, parent_email, user_id } = req.body;
    const query = 'UPDATE parents SET parent_name = ?, parent_email = ?, user_id = ? WHERE parent_id = ?';
  
    req.db.query(query, [parent_name, parent_email, user_id, parentId], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json({ message: 'Parent updated successfully' });
      }
    });
  };
  
  // Delete parent
  exports.deleteParent = (req, res) => {
    const parentId = req.params.id;
    const query = 'DELETE FROM parents WHERE parent_id = ?';
  
    req.db.query(query, [parentId], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json({ message: 'Parent deleted successfully' });
      }
    });
  };
  