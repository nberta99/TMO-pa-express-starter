const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

class Book {
  constructor(author, title, publicationYear) {
      this.id = id;
      this.author = author;
      this.title = title;
      this.yearPublished = publicationYear;
      id = id + 1;
      // console.log(this.id);
  }
}

function compare(a, b) {
  const bookA = a.title.toUpperCase();
  const bookB = b.title.toUpperCase();

  let comparison = 0;
  if (bookA > bookB) {
    comparison = 1;
  } else if (bookA < bookB) {
    comparison = -1;
  }
  return comparison;
}

let id = 1;
const books = []; //[new Book("Suzanne Collins", "The Hunger Games", 2009), new Book("Jeff Kinney", "Diary of a Wimpy Kid", 2005), new Book("George Orwell", "1984", 1949)];

// app.get("/", (req, res) => {
//   res.status(200).send("Hello, world!");
// });

// app.get("/health", (req, res) => {
//   res.status(200).send("Don't panic.");
// });

// send back as title asc array called books in json
app.get("/api/books", (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  let sortedBooks = books.sort(compare);
  console.log(sortedBooks);
  res.end(JSON.stringify({books: sortedBooks}));
  res.status(200).send();
});

// Done
app.post("/api/books", (req, res) => {
  let data = req.body;
  let newBook = new Book(data.author, data.title, data.yearPublished);
  books.push(newBook);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({id: newBook.id, author: newBook.author, title: newBook.title, yearPublished: newBook.yearPublished}));
  res.status(201).send();
});

// Done
app.delete("/api/books", (req, res) => {
  books = [];
  res.status(204).send();
});

module.exports = app;
