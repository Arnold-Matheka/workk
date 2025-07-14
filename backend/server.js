const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// In-memory user storage
let users = [
  // Example user
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    status: 'active',
    policies: 2,
    joinDate: '2024-01-01'
  }
];
let nextId = 2;

// Get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Add a new user
app.post('/api/users', (req, res) => {
  const user = { id: nextId++, ...req.body };
  users.push(user);
  res.status(201).json(user);
});

// Update a user
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  users[idx] = { ...users[idx], ...req.body };
  res.json(users[idx]);
});

// Delete a user
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  users.splice(idx, 1);
  res.status(204).send();
});

// Example route
app.get('/', (req, res) => {
  res.send('Express backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
