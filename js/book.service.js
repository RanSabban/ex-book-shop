'use strict';

var gBooks = getBooks()

function getBooks(){
    return  [
        {id: makeId(),name: 'The adventures of Lori Ipsi' , price: 120, img: 'img/tintin.jpeg'},
        {id: makeId(),name: 'World Atlas' , price: 300, img: 'img/world-atlas.jpg'},
        {id: makeId(),name: 'Zobra the Greek' , price: 87, img: 'zobra-the-greek.jpg'}
    ]
}

function removeBook(id){
    const index = gBooks.findIndex(book => book.id === id)
    gBooks.splice(index,1)
}

function updateBook(id){
    const index = gBooks.findIndex(book => book.id === id)
    const formerPrice = gBooks[index].price
    gBooks[index].price = prompt('Please enter new price',formerPrice)
}

function addBook(bookTitle,bookPrice){
    gBooks.unshift({
        id: makeId(),
        name: bookTitle,
        price: bookPrice
    })
}

