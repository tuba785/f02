let form = document.querySelector(".form");
let boxesContainer = document.querySelector(".boxes");
let inputTitle = document.querySelector(".titleWrite");
let inputAutor = document.querySelector(".autorWrite");
let inputCheckbox = document.querySelector(".checkboxWrite");
let btnAdd = document.querySelector(".btnAdd");

let books = [];

function Book(title, autor, isread) {
  this.title = title;
  this.autor = autor;
  this.isread = isread;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let book = new Book(
    inputTitle.value,
    inputAutor.value,
    inputCheckbox.checked
  );
  books.push(book);
  showBooks();
  //   inputTitle.value = "";
  //   inputAutor.value = "";
  //   inputCheckbox.checked = false;
  form.reset();
});

function showBooks() {
  boxesContainer.innerHTML = "";
  books.forEach((book) => {
    let box = document.createElement("div");
    box.classList.add("box");

    // let title = document.createElement("p");
    // title.classList.add("boxPTitle");
    // title.textContent = book.title;

    // let autor = document.createElement("p");
    // autor.classList.add("boxPAutor");
    // autor.textContent = "Author: " + book.autor;

    // let status = document.createElement("p");
    // status.classList.add("boxPStatus");
    // status.textContent = book.isread ? "Read" : "Not Read";

    box.innerHTML = `<p class="boxPTitle">${book.title}</p>
            <p class="boxPAutor">Author: ${book.autor}</p>
            <p  class="boxPStatus">${book.isread ? "Read" : "Not Read"}</p>`;

    // box.appendChild(title);
    // box.appendChild(autor);
    // box.appendChild(status);
    boxesContainer.appendChild(box);
  });
}
