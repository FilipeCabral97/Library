// ---------- CLASSES ----------

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

class Library {
  constructor() {
    this.books = [];
  }
  addBook(newBook) {
    this.books.push(newBook);
  }
  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }
  bookExists(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }
  getBook(title) {
    return this.books.find((book) => book.title === title);
  }
}

// CREATE LIBRARY
const lib = new Library();

// ---------- INTERFACE ----------
const modal = document.querySelector(".modal");
const openModalBtn = document.querySelector(".open-modal-btn");
const bookForm = document.querySelector(".modal-form");
const booksGrid = document.querySelector(".books-grid");

// Open Modal
openModalBtn.onclick = () => openModal();

// Close Modal
window.onclick = (e) => {
  if (e.target == modal) closeModal();
};
window.onkeydown = (e) => {
  if (e.key === "Escape") closeModal();
};

const openModal = () => {
  resetModal();
  modal.style.display = "flex";
  document.querySelector("#title").focus();
};
const closeModal = () => (modal.style.display = "none");
const resetModal = () => bookForm.reset();

const getBookFromInput = () => {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#isRead").checked;

  return new Book(title, author, pages, isRead);
};

const createBookCard = (book) => {
  const bookCard = document.createElement("div");
  const removeBtn = document.createElement("button");
  const container = document.createElement("div");
  const titleAuthorContainer = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pagesReadBtnContainer = document.createElement("div");
  const pages = document.createElement("p");
  const readBtn = document.createElement("button");

  bookCard.classList.add("book");
  removeBtn.classList.add("remove-card");
  container.classList.add("book-container");
  titleAuthorContainer.classList.add("title-author");
  title.classList.add("book-title");
  author.classList.add("book-author");
  pagesReadBtnContainer.classList.add("pages-button");
  pages.classList.add("pages");

  readBtn.onclick = toggleRead;
  removeBtn.onclick = removeBook;

  title.textContent = `${book.title}`;
  author.textContent = `by ${book.author}`;
  pages.textContent = `(p${book.pages})`;
  removeBtn.textContent = "X";

  readBtn.classList.add("isRead-btn");
  if (book.isRead) {
    readBtn.textContent = "Read";
    readBtn.classList.add("isRead-btn-green");
  } else {
    readBtn.textContent = "Not read";
    readBtn.classList.add("isRead-btn-red");
  }

  booksGrid.appendChild(bookCard);
  bookCard.appendChild(removeBtn);
  bookCard.appendChild(container);
  container.appendChild(titleAuthorContainer);
  container.appendChild(pagesReadBtnContainer);
  titleAuthorContainer.appendChild(title);
  titleAuthorContainer.appendChild(author);
  pagesReadBtnContainer.appendChild(pages);
  pagesReadBtnContainer.appendChild(readBtn);
};

const addBook = (e) => {
  e.preventDefault();
  const newBook = getBookFromInput();

  if (lib.bookExists(newBook)) {
    alert("Book already exists");
    return;
  }

  lib.addBook(newBook);

  updateBooksGrid();
  closeModal();
};

const removeBook = (e) => {
  const title = e.target.nextSibling.firstChild.firstChild.innerHTML;

  lib.removeBook(title);
  updateBooksGrid();
};

const resetBooksGrid = () => {
  booksGrid.innerHTML = "";
};

const updateBooksGrid = () => {
  resetBooksGrid();
  for (let book of lib.books) {
    createBookCard(book);
  }
};

const toggleRead = (e) => {
  const title = e.target.parentNode.parentNode.firstChild.firstChild.innerHTML;

  const book = lib.getBook(title);
  book.isRead = !book.isRead;
  updateBooksGrid();
};

bookForm.onsubmit = addBook;
