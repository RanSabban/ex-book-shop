'use strict';

function oninit(){
    render()
}

function render(){
    var strHTML = `<table>
    <tr>
        <th>Title</th>
        <th>Price</th>
        <th>Actions</th>
    </tr>`
    var books = getBooks()
    var tableHTML = books.map(book => 
        `
        <tr>
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td>
            <button onclick="onReadBook('${book.id}')">Read</button>
            <button onclick="onUpdateBook('${book.id}')">Update</button>
            <button onclick="onRemoveBook('${book.id}')">Delete</button>
            </td>
        </tr>
        `
    )
    strHTML+= tableHTML.join('') + '</table>'
    const tableEl = document.querySelector('table')
    tableEl.innerHTML = strHTML
}

function onRemoveBook(bookId){
    // console.log('id',id)
    removeBook(bookId)
    render()
}

function onUpdateBook(bookId){
    // console.log('id',id);
    updateBook(bookId)
    render()
}

function onAddBook(){
    const bookTitle = prompt("Please enter the book title")
    const bookPrice = +prompt("Please enter the book price")
    addBook(bookTitle,bookPrice)
    render()
}

function onReadBook(bookId){
    const elDialog = document.querySelector('.book-details')
    const elText = elDialog.querySelector('.book-info')
    const book = getBookByIndex(bookId)
    elText.innerText = `
    Book ID: ${book.id}
    Book Title: ${book.name}
    Book Price: ${book.price}`
    const bookImgEl = elDialog.querySelector('.book-img').src = book.img
    elDialog.showModal()
}

function closeModal(){
    const dialog = document.querySelector('dialog')
    dialog.close()
}

function filterBooks(el){
    const value = el.value
    setFilterBy(value)
    render()
}

function onClearClick(event){
    event.preventDefault()
    const elFilter = document.querySelector('.filter')
    elFilter.value = ''
    setFilterBy('')
    render()
}



