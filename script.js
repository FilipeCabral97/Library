function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.info = function () {
  if (this.isRead) {
    return `${this.title} by ${this.author}, ${this.pages}, already read`;
  } else {
    return `${this.title} by ${this.author}, ${this.pages}, not read yet`;
  }
};

let myLibrary = [];

const addBookToLibrary = () => {
  let title = prompt("Title");
  let author = prompt("Author");
  let pages;
  while (true) {
    let pagesInput;
    pagesInput = prompt("Pages", "0");
    if (isNaN(pagesInput)) {
      alert("Enter a number");
    } else {
      pages = parseInt(pagesInput);
      break;
    }
  }

  console.log(author, title, pages, typeof pages);
};

let modal = document.querySelector(".modal");
let openModalBtn = document.querySelector(".open-modal-btn");

openModalBtn.addEventListener("click", () => (modal.style.display = "flex"));

window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};
