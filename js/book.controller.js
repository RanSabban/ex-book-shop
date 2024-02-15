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

function onReadBook(id){
    // fix elDialog + imgqueryselector
    const elDialog = document.querySelector('dialog')
    const elText = elDialog.querySelector('.book-info')
    //don't touch gBooks!!!
    const index = gBooks.findIndex(book => book.id === id)
    elText.innerText = `
    Book ID: ${gBooks[index].id}
    Book Title: ${gBooks[index].name}
    Book Price: ${gBooks[index].price}`
    const bookImgEl = document.querySelector('.book-img').src = gBooks[index].img
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

function onClearClick(){
    const elFilter = document.querySelector('.filter')
    elFilter.value = ''
}



