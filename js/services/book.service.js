"use strict";

const BOOKS_DB = 'booksDB'
var gBooks = createBooks()
var gStatistics = {
  expensive: 0,
  average: 0,
  cheap: 0
}

function getBooks(options) {
  const books = _filterBooks(options.filterBy)
  if (options.sortBy.name){
    books.sort((book1,book2) => (book1.name.localeCompare(book2.name)) * options.sortBy.name)
  }
  if (options.sortBy.rating){
    books.sort((book1,book2) => (book1.rating - book2.rating) * options.sortBy.rating)
  }
  if (options.sortBy.price){
    console.log('here');
    books.sort((book1,book2) => (book1.price - book2.price) * options.sortBy.price)
  }
  const startIdx = options.page.idx * options.page.size
  return books.slice(startIdx, startIdx + options.page.size)
}

function _filterBooks(filterBy) {
  return gBooks.filter(book => {
    if (book.name.toLowerCase().includes(filterBy.txt) && book.rating >= filterBy.minRating) {
      return book
    }
  })
}

function getTotalPageCount(options){
  const cars = _filterBooks(options.filterBy)
  return Math.ceil(cars.length / options.page.size)
}

function createBooks() {
  var books = loadFromStorage(BOOKS_DB)
  if (!books) {
    return [
      {
        id: makeId(),
        name: "The adventures of Lori Ipsi",
        price: 120,
        img: "img/tintin.jpeg",
        rating: getRandomIntInclusive(1, 5)
      },
      {
        id: makeId(),
        name: "World Atlas",
        price: 300,
        img: "img/world-atlas.jpg",
        rating: getRandomIntInclusive(1, 5)
      },
      {
        id: makeId(),
        name: "Zobra the Greek",
        price: 87,
        img: "img/zobra-the-greek.jpg",
        rating: getRandomIntInclusive(1, 5)
      },
    ]
  }
  return books
}

function removeBook(id) {
  const index = gBooks.findIndex((book) => book.id === id)
  gBooks.splice(index, 1)
  _saveBooks()
  updateStatistics()
}

function updateBook(bookId, newName, newPrice, newRating) {
  const index = getBookIndex(bookId)
  gBooks[index].price = newPrice
  gBooks[index].name = newName
  gBooks[index].rating = newRating
  _saveBooks()
  updateStatistics()
}

function addBook(bookTitle, bookPrice, bookRating) {
  gBooks.unshift({
    id: makeId(),
    name: bookTitle,
    price: bookPrice,
    img: 'img/general-book.png',
    rating: bookRating
  })
  _saveBooks()
  updateStatistics()
}

function _saveBooks() {
  saveToStorage(BOOKS_DB, gBooks)
}

function getBookIndex(bookId) {
  return gBooks.findIndex(book => book.id === bookId)
}

function getBookByIndex(bookId) {
  return gBooks.find(book => book.id === bookId)
}

function updateStatistics() {
  for (var counter in gStatistics) {
    gStatistics[counter] = 0
  }
  gBooks.forEach(book => {
    book.price > 200 ? gStatistics.expensive++ :
      book.price >= 80 ? gStatistics.average++ : gStatistics.cheap++
  })
}

function getStatistics() {
  return gStatistics
}
