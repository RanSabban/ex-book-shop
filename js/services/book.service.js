"use strict";

const BOOKS_DB = 'booksDB'
var gFilterBy = 'all'
var gBooks = createBooks()
var gStatistics = {
  expensive: 0,
  average:0,
  cheap:0
}

function getBooks() {
    if(gFilterBy === 'all' || gFilterBy === '') return gBooks
    return gBooks.filter(book => book.name.toLowerCase().includes(gFilterBy))
    
}

function createBooks(){
    var books = loadFromStorage(BOOKS_DB)
    if (!books){
        return [
            {
              id: makeId(),
              name: "The adventures of Lori Ipsi",
              price: 120,
              img: "img/tintin.jpeg",
            },
            {
              id: makeId(),
              name: "World Atlas",
              price: 300,
              img: "img/world-atlas.jpg",
            },
            {
              id: makeId(),
              name: "Zobra the Greek",
              price: 87,
              img: "img/zobra-the-greek.jpg",
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

function updateBook(bookId,newPrice) {
  const index = getBookIndex(bookId)
  gBooks[index].price = newPrice
  _saveBooks()
  updateStatistics()
}

function addBook(bookTitle, bookPrice) {
  gBooks.unshift({
    id: makeId(),
    name: bookTitle,
    price: bookPrice,
    img: 'img/general-book.png'
  })
  _saveBooks()
  updateStatistics()
}

function _saveBooks(){
    saveToStorage(BOOKS_DB,gBooks)
}

function setFilterBy(filterBy){
    gFilterBy = filterBy.toLowerCase()
}

function getBookIndex(bookId){
  return gBooks.findIndex(book => book.id === bookId)
}

function getBookByIndex(bookId){
   return gBooks.find(book => book.id === bookId )
}

function updateStatistics(){
  for(var counter in gStatistics){
    gStatistics[counter] = 0
  }
  gBooks.forEach(book => {
    book.price > 200 ? gStatistics.expensive++ :
    book.price >= 80 ? gStatistics.average++ : gStatistics.cheap++
  })
}

function getStatistics(){
  return gStatistics
}
