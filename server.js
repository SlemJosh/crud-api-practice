const express = require("express");
const app = express();
app.use(express.json());

const usersRouter = require("./routes/users");
app.use("/api/users", usersRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Logs the error in your terminal
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
