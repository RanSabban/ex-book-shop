'use strict';

function oninit(){
    render()
    updateStatistics()
    renderStatistics()
}

function render(){
    var strHTML = `<table>
    <tr>
        <th>Title</th>
        <th>Price</th>
        <th>Actions</th>
    </tr>`
    var books = getBooks()
    books.length === 0 ? showNoResult() : hideNoResult()
    var tableHTML = books.map(book => 
        `
        <tr>
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td>
            <button class = "read" onclick="onReadBook('${book.id}')">Read</button>
            <button class = "update" onclick="onUpdateBook('${book.id}')">Update</button>
            <button class = "delete" onclick="onRemoveBook('${book.id}')">Delete</button>
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
    showSuccess()
    renderStatistics()
}

function onUpdateBook(bookId){
    const newPrice = +prompt("Please enter new price")
    if (!newPrice){
        alert(`Can't get blank details.`)
        return
    }
    updateBook(bookId,newPrice)
    render()
    showSuccess()
    renderStatistics()
}

function onAddBook(){
    const bookTitle = prompt("Please enter the book title")
    const bookPrice = +prompt("Please enter the book price")
    if (!bookTitle||!bookPrice) {
        alert(`Can't get blank details.`)
        return
    }
    addBook(bookTitle,bookPrice)
    render()
    showSuccess()
    renderStatistics()
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

function closeBookInfo(){
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

function showSuccess(){
    const elModal = document.querySelector(".modal-feedback")
    elModal.style.display = 'block'
    setTimeout(() => {
        elModal.style.display = 'none'
    },2000)
}


function renderStatistics(){
    const statistics = getStatistics()
    const statisticsEl = document.querySelector(".statistics")
    const strHTML = `Book Statistics: Expensive: ${statistics.expensive} average: ${statistics.average} cheap: ${statistics.cheap}`
    statisticsEl.innerText = strHTML
}

function showNoResult(){
    const elText = document.querySelector(".no-result-found")
    elText.innerHTML = `<h1>No matching books were found...</h1>`
}

function hideNoResult(){
    const elText = document.querySelector(".no-result-found")
    elText.innerHTML = ''
}


