const express = require("express");
const router = express.Router();

// Sample in-memory users array
let users = [
  { id: 1, name: "GrayBear" },
  { id: 2, name: "Libby" },
];

// GET all users
router.get("/", (req, res) => {
  res.json(users);
});

// POST a new user
router.post("/", (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(new Error("Name is required"));
  }
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT (update) user by ID
router.put("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return next(new Error("User not found"));
  }

  user.name = name || user.name;
  res.json(user);
});

// DELETE user by ID
router.delete("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return next(new Error("User not found"));
  }

  users.splice(index, 1);
  res.json({ message: "User deleted" });
});

module.exports = router;
