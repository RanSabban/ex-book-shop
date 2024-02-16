"use strict";

const BOOKS_DB = 'booksDB'
var gFilterBy = 'all'

var gBooks = createBooks()

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
}

function updateBook(id) {
    // delete the prompt from service
  const index = gBooks.findIndex((book) => book.id === id)
  console.log(index , gBooks)
  gBooks[index].price = prompt("Please enter new price", gBooks[index].price)
  _saveBooks()
}

function addBook(bookTitle, bookPrice) {
  gBooks.unshift({
    id: makeId(),
    name: bookTitle,
    price: bookPrice,
    img: 'img/general-book.png'
  })
  _saveBooks()
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