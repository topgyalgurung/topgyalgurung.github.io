const express = require("express");
const router = express.Router();
const axios = require("axios");

// Function to fetch reading list
async function getReadingList() {
  try {
    const response = await axios.get(
      "https://openlibrary.org/people/topgyaltsering/books/currently-reading.json"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reading list:", error);
    return null;
  }
}

// // Function to fetch read books
// async function getReadBooks() {
//   try {
//     const response = await axios.get(
//       "https://openlibrary.org/people/topgyaltsering/books/already-read.json"
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching read books:", error);
//     return null;
//   }
// }

router.get("/reading-list", async (req, res) => {
  const readingList = await getReadingList();
  res.json(readingList);
});

// router.get("/read-books", async (req, res) => {
//   const readBooks = await getReadBooks();
//   res.json(readBooks);
// });

module.exports = router;
