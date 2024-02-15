'use strict';

var gBooks = getBooks()

function getBooks(){
    return  [
        {id: makeId(),name: 'The adventures of Lori Ipsi' , price: 120},
        {id: makeId(),name: 'World Atlas' , price: 300},
        {id: makeId(),name: 'Zobra the Greek' , price: 87}
    ]
}

