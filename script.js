let myLibrary = [];

//constructor function for new book objects
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

//info about the book
Book.prototype.info = function() {
    let infoArr = [];
    infoArr.push(this.title, this.author, this.pages, this.read);
    return infoArr.join(", ");
  }

function addBookToLibrary(t, a, p, r) {
	myLibrary.push(new Book(t, a, p, r));
}