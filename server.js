const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory users array
let users = [
  { id: 1, name: "Josh", role: "Paladin" },
  { id: 2, name: "GrayBear", role: "Druid" }
];

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// POST create new user
app.post('/api/users', (req, res) => {
  const { name, role } = req.body;
  const newUser = { id: Date.now(), name, role };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, role } = req.body;
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });
  user.name = name;
  user.role = role;
  res.json(user);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ error: "User not found" });
  users.splice(index, 1);
  res.json({ message: "User deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
