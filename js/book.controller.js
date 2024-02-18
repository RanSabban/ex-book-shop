'use strict';
const gQueryOptions = {
    filterBy: {txt: '', minRating: 0},
    sortBy: {}, 
    page: {idx: 0,size: 5}
}
var gIsGrid = false
var gBookToEdit = null
function oninit(){
    readQueryParams()
    render()
    updateStatistics()
    renderStatistics()
}

var gIsDescendingRating = false
var gIsDescendingName = false
var gIsDescendingPrice = false

function render(){
    if (!gIsGrid){
    const elGrid = document.querySelector('.grid-container')
    elGrid.style.display = 'none'
    const tableEl = document.querySelector('table')
    tableEl.style.display = 'block'
    var strHTML = ''
    var books = getBooks(gQueryOptions)
    books.length === 0 ? showNoResult() : hideNoResult()
    var tableHTML = books.map(book => 
        `
        <tr>
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td>${convertToStars(book.rating)}</td>
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
    setQueryParams()
    } else {
        const tableEl = document.querySelector('table')
        tableEl.style.display = 'none'
        var strHTML = ''
        var books = getBooks(gQueryOptions)
        books.length === 0 ? showNoResult() : hideNoResult()
        var gridHTML = books.map(book => 
            `
            <section class = "grid-item"> 
            <p>
            Name: ${book.name} </br>
            Price: ${book.price} </br>
            Rating: ${convertToStars(book.rating)} </br>
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
        setQueryParams()
    }
}

function convertToStars(counter){
    var strStars = ''
    for(var i = 0;i < counter; i++){
        strStars += '⭐️'
    }
    return strStars
}

function onRemoveBook(bookId){
    removeBook(bookId)
    render()
    showSuccess('Book removed')
    renderStatistics()
}

function onUpdateBook(bookId){
    const elModal = document.querySelector('.book-edit-modal')
    const elHeading = elModal.querySelector('h2')
    const elBookName = elModal.querySelector('.book-add-name')
    const elBookPrice = elModal.querySelector('.book-add-price')
    const elBookRating = elModal.querySelector('.book-add-rating')
    
    gBookToEdit = getBookByIndex(bookId)

    elHeading.innerText = 'Edit Book'
    elBookName.value = gBookToEdit.name
    elBookPrice.value = gBookToEdit.price
    elBookRating.value = gBookToEdit.rating
    elModal.showModal()
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
    const elBookRating = elForm.querySelector('.book-add-rating')

    const bookName = elBookName.value
    const bookPrice = elBookPrice.value
    const bookRating = elBookRating.value

    if (!bookName || !bookPrice){
        alert(`Can't get blank details.`)
        return
    }
    if (bookRating < 1 || bookRating > 5){
        alert(`Numbers between 1 to 5 only`)
        return
    }
    if (gBookToEdit){
        updateBook(gBookToEdit.id,bookName,bookPrice,bookRating)
        gBookToEdit = null
    } else {
        addBook(bookName,bookPrice,bookRating)
    }
    render()
    showSuccess('Book added')
    renderStatistics()
    resetBookEdit()
}

function plusBtnRating(elBtn){
    document.querySelector('.book-add-rating').value++
}

function minusBtnRating(elBtn){
    document.querySelector('.book-add-rating').value--
}

function resetBookEdit(){
    const elForm = document.querySelector('.book-edit-modal form')
    const elBookName = elForm.querySelector('.book-add-name')
    const elBookPrice = elForm.querySelector('.book-add-price')
    const elBookRating = elForm.querySelector('.book-add-rating')
    elBookRating.value = ''
    elBookPrice.value = 0
    elBookName.value = ''
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

//filter by 

function filterBooks(el){
    const value = el.value
    gQueryOptions.filterBy.txt = value.toLowerCase()
    render()
}

function minRating(el){
    const value = el.value
    gQueryOptions.filterBy.minRating = value
    // console.log(value)
    render()

}

// sort by 

function onSetSortBy(strAction){
    // const elSortBy = document.querySelector('.sort-by select')
    // const elDir = document.querySelector('.sort-desc')
    gQueryOptions.sortBy = {}
    if (strAction === 'Name'){
        gIsDescendingName = !gIsDescendingName
        gQueryOptions.sortBy = {rating: gIsDescendingName ? 1 : -1}
    }
    if (strAction === 'Rating'){
        gIsDescendingRating = !gIsDescendingRating
        gQueryOptions.sortBy = {rating: gIsDescendingRating ? 1 : -1}
    }
    if (strAction === 'Price'){
        gIsDescendingPrice = !gIsDescendingPrice
        gQueryOptions.sortBy = {rating: gIsDescendingPrice ? 1 : -1}
    }
  
    render()
}
// gQueryOptions.sortBy = {name: dir}


// pages

function onNextPage(){
    const totalPageCount = getTotalPageCount(gQueryOptions)

    if (totalPageCount > gQueryOptions.page.idx + 1){
        gQueryOptions.page.idx++
    } else {
        gQueryOptions.page.idx = 0 
    }
    render()

}

function onPrevPage(){
    const totalPageCount = getTotalPageCount(gQueryOptions)

    if (gQueryOptions.page.idx >= 1 ){
        gQueryOptions.page.idx--
    } else {
        gQueryOptions.page.idx = totalPageCount - 1
    }
    render()
}

function onClearClick(event){
    event.preventDefault()
    const elFilter = document.querySelector('.filter-books')
    const elFilterBooks = elFilter.querySelector('.filter')
    elFilterBooks.value = ''
    const elRating = elFilter.querySelector('.minimum-rating')
    elRating.value = ''
    gQueryOptions.filterBy.txt = ''
    gQueryOptions.filterBy.minRating = 0
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

//no result feedback

function showNoResult(){
    const elText = document.querySelector(".no-result-found")
    elText.innerHTML = `<h1>No matching books were found...</h1>`
}

function hideNoResult(){
    const elText = document.querySelector(".no-result-found")
    elText.innerHTML = ''
}

// toggle display

function toggleDisplay(){
    gIsGrid = !gIsGrid
    render()
}

// query params

function readQueryParams(){
    const queryParams = new URLSearchParams(window.location.search)
    gQueryOptions.filterBy = {
        txt: queryParams.get('bookName') || '',
        minRating: +queryParams.get('minRating') || ''
    }
    renderQueryParams()
}

function renderQueryParams(){
    document.querySelector('.filter').value = gQueryOptions.filterBy.txt
    document.querySelector('.minimum-rating').value = gQueryOptions.filterBy.minRating
}

function setQueryParams(){
    const queryParams = new URLSearchParams()
    queryParams.set('bookName', gQueryOptions.filterBy.txt)
    queryParams.set('minRating', gQueryOptions.filterBy.minRating)
    
    const newURL = 
        window.location.protocol + "//" +
        window.location.host +
        window.location.pathname + '?' + queryParams.toString()

    window.history.pushState({path: newURL} , '' , newURL)

}


