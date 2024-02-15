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
            <button>Read</button>
            <button>Update</button>
            <button>Delete</button>
            </td>
        </tr>
        `
    )
    strHTML+= tableHTML.join('') + '</table>'
    const tableEl = document.querySelector('table')
    tableEl.innerHTML = strHTML
}



