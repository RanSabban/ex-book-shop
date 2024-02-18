'use strict';

var gIsGrid = false

function oninit(){
    render()
    updateStatistics()
    renderStatistics()
}

function render(){
    if (!gIsGrid){
    const elGrid = document.querySelector('.grid-container')
    elGrid.style.display = 'none'
    const tableEl = document.querySelector('table')
    tableEl.style.display = 'block'
    var strHTML = ''
    var books = getBooks()
    books.length === 0 ? showNoResult() : hideNoResult()
    var tableHTML = books.map(book => 
        `
        <tr>
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td>${book.rating}</td>
            <td>
            <button class = "read" onclick="onReadBook('${book.id}')">Read</button>
            <button class = "update" onclick="onUpdateBook('${book.id}')">Update</button>
            <button class = "delete" onclick="onRemoveBook('${book.id}')">Delete</button>
            </td>
        </tr>
        `
    )
    strHTML+= tableHTML.join('')
    const inTableEl = document.querySelector('table tbody')
    inTableEl.innerHTML = strHTML
    } else {
        const tableEl = document.querySelector('table')
        tableEl.style.display = 'none'
        var strHTML = ''
        var books = getBooks()
        books.length === 0 ? showNoResult() : hideNoResult()
        var gridHTML = books.map(book => 
            `
            <section class = "grid-item"> 
            <p>
            Name: ${book.name} </br>
            Price: ${book.price} </br>
            Rating: ${book.rating} </br>
            <button class = "read" onclick="onReadBook('${book.id}')">Read</button>
            <button class = "update" onclick="onUpdateBook('${book.id}')">Update</button>
            <button class = "delete" onclick="onRemoveBook('${book.id}')">Delete</button>
            </p>
            </section>
            `
        )
        strHTML += gridHTML.join('')
        const elGrid = document.querySelector('.grid-container')
        elGrid.innerHTML = strHTML
        elGrid.style.display = 'grid'
    }
}

function onRemoveBook(bookId){
    // console.log('id',id)
    removeBook(bookId)
    render()
    showSuccess('Book removed')
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
    showSuccess('Book updated')
    renderStatistics()
}

function onAddBook(){
    const elModal = document.querySelector('.book-edit-modal')
    const elHeading = elModal.querySelector('h2')
    elHeading.innerText = 'Add Book'
    elModal.showModal()
}

function onCloseCarEdit(){
    const elModal = document.querySelector('.book-edit-modal')
    elModal.close()
}

function onSaveCar(){
    const elForm = document.querySelector('.book-edit-modal form')
    const elBookName = elForm.querySelector('.book-add-name')
    const elBookPrice = elForm.querySelector('.book-add-price')

    const bookName = elBookName.value
    const bookPrice = elBookPrice.value

    if (!bookName || !bookPrice){
        alert(`Can't get blank details.`)
        return
    }
    addBook(bookName,bookPrice)
    render()
    showSuccess('Book added')
    renderStatistics()
}

function onReadBook(bookId){
    const elDialog = document.querySelector('.book-details')
    const elText = elDialog.querySelector('.book-info')
    const book = getBookByIndex(bookId)
    elText.innerText = `
    Book ID: ${book.id}
    Book Title: ${book.name}
    Book Price: ${book.price}
    Book Rating: ${book.rating}`
    const bookImgEl = elDialog.querySelector('.book-img').src = book.img
    elDialog.showModal()
}

function closeBookInfo(){
    const dialog = document.querySelector('.book-details')
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

function showSuccess(txt){
    const elModal = document.querySelector(".modal-feedback")
    elModal.style.display = 'block'
    elModal.innerText = txt
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

function toggleDisplay(){
    gIsGrid = !gIsGrid
    render()
}

function showAddBookModal(txt){
    const elModal = document.querySelector('.add-book')
    elModal.display = 'block'
    elModal.innerText = txt
}

function hideAddBookModal(){
    const elModal = document.querySelector('.add-book')
    elModal.display = 'none'
}

function onSubmitAddBook(){
    const input = document.querySelector('.add-book-details')
    return input.value
}


