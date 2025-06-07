const express = require("express");
const path = require("path");
const booksRouter = require("./api/books");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// API routes
app.use("/api", booksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
