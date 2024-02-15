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
    var tableHTML = gBooks.map(book => 
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

function onRemoveBook(id){
    // console.log('id',id)
    removeBook(id)
    render()
}

function onUpdateBook(id){
    // console.log('id',id);
    updateBook(id)
    render()
}

function onAddBook(){
    const bookTitle = prompt("Please enter the book title")
    const bookPrice = prompt("Please enter the book price")
    addBook(bookTitle,bookPrice)
    render()
}

function onReadBook(id){
    const dialog = document.querySelector('dialog')
    const textEl = document.querySelector('.book-info')
    const index = gBooks.findIndex(book => book.id === id)
    textEl.innerText = `
    Book ID: ${gBooks[index].id}
    Book Title: ${gBooks[index].name}
    Book Price: ${gBooks[index].price}`
    const bookImgEl = document.querySelector('.book-img').src = gBooks[index].img
    dialog.showModal()
}

function closeModal(){
    const dialog = document.querySelector('dialog')
    dialog.close()
}



