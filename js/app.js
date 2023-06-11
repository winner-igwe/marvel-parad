const movies_con  = document.querySelector(".movies_span_con")
const more_btn  = document.querySelector(".moree")
const watchlistCon  = document.querySelector(".watchlist_con")
const adding_con = document.getElementById("adding")
const input = document.getElementById("input")


const idsToHide = [8, 9, 10, 11, 12, 13, 14, 15];
let list = [];
let data;
fetch("../data.json")
    .then(response => response.json())
    .then(list => {
        data = list.movies;
        updateDom(data);
        checkSearch(data);
        JSON.parse(localStorage.getItem('list')).forEach(it => {
            data[it.id].red = true
        })

    
        data.map(dat => {
            if (dat.red == true) {
                document.querySelectorAll(".svg")[data.indexOf(dat)].classList.add("red")
            }
        })
    
    })

        

function updateDom (data) {
    changeDom (data)
    let more_flag = true
    moreEvent (more_flag,data)

}

function changeItem (state,itemse) {
    
    itemse.forEach(item => {
    const svgId = parseInt(item.querySelector(".svg").id);
    if (idsToHide.includes(svgId)) {
        item.style.display = `${state}`;
    }
    });

}
function moreEvent (more_flag,data) {
    changeDom (data)
    const itemse = document.querySelectorAll(".item")
    changeItem("none",itemse)
    more_btn.addEventListener("click", _=> {
        if(more_flag) {
            more_btn.innerText = "...Less"
            changeItem("block",itemse)
            more_flag = false
        }else if(!more_flag) {
            more_btn.innerText = "More..."
            changeItem("none",itemse)
            more_flag = true
        }
    }) 
}

function changeDom (data) {
    let content = data.map((value) => {

        return `<div class="item">
        <img src="${value.image}" alt="">
        <div class="name_et_fav">
            <span>${value.name}</span>
            <svg viewBox="0 0 24 24" style="" aria-hidden="true" width="20" class="svg" id = ${data.indexOf(value)}><g><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path></g></svg>
        </div>
        <div class="time_et_date">
            <span class="length">${value.time}</span>
            <span class="divide">|</span>
            <span class="date">${value.date}</span>
        </div>
    </div>`
    }).join("")
    movies_con.innerHTML = content  
    const boomarks = document.querySelectorAll(".svg")
    bookClick(boomarks,data)
}


function bookClick (boomarks,data) {
    boomarks.forEach(bookmark => {
        bookmark.addEventListener("click",_ => {
            let currentSelect = data[bookmark.id]
            if(currentSelect.red) {
                currentSelect.red = false
                bookmark.classList.remove("red")
            }else {
                currentSelect.red = true
            }
            getItems(bookmark)
            addNewPage(boomarks)
        })

    })
    data.map(dat => {
        if (dat.red == true) {
            boomarks[data.indexOf(dat)].style.fill = "red"
        } 
        
    })
}


function findSingle(object) {
    const list = JSON.parse(localStorage.getItem('list'));
    if (list && Array.isArray(list)) {
        return list.find((item) => item.id === object.id);
    }
    return null;
}
function getItems(bookmark) {
    let object = {};
    bookmark.classList.add("red");
    let id = bookmark.id;
    let name = bookmark.previousElementSibling.outerHTML;
    let image = bookmark.parentElement.previousElementSibling.outerHTML;
    object.id = id;
    object.name = name;
    object.image = image;
    object.book = bookmark.outerHTML;
    singleItem = findSingle(object);
    const storedList = JSON.parse(localStorage.getItem('list'));
    if (!storedList || storedList.length === 0 || !singleItem) {
        addToLocalStorage(object);
    } else if (singleItem) {
        checkConsecutiveClick(object.id);
        bookmark.classList.remove("red");
    }
}

function addToLocalStorage(object) {
    let itemsss = getLocalStorage()
    itemsss.push(object)
    localStorage.setItem('list',JSON.stringify(itemsss))
}
function getLocalStorage() {
    return localStorage.getItem('list') 
    ? JSON.parse(localStorage.getItem('list')) :[]
}


function checkConsecutiveClick(id) {
    const storedList = JSON.parse(localStorage.getItem('list'));
    const index = storedList.findIndex((item) => item.id === id);
    if (index !== -1) {
        storedList.splice(index, 1);
        localStorage.setItem('list', JSON.stringify(storedList));
    }
}

const nlist = localStorage.getItem('list');
if (nlist.length === 0) {
    watchlistCon.innerHTML = '<p class = "no_list"> Your bookmark is empty (: </p>'
}else {
    addItemDom(nlist)
}
const svgs = document.querySelectorAll(".bk")
svgs.forEach(svg => {
    svg.addEventListener("click", _=> {
        let idSvg = svg.id
        checkConsecutiveClick(idSvg)
        document.querySelectorAll(".svg")[idSvg].classList.remove("red")
        addNewPage(document.querySelectorAll(".svg"))
    })
})
    
    
    
function addNewPage (bookmarks) {
    const list = localStorage.getItem('list')
    if (JSON.parse(list).length > 0) {
        addItemDom(list)
    } else {
        watchlistCon.innerHTML = '<p class = "no_list"> Your bookmark is empty (: </p>'
    }

    const svgs = document.querySelectorAll(".bk")
    svgs.forEach(svg => {
        svg.addEventListener("click", _=> {
            let idSvg = svg.id
            checkConsecutiveClick(idSvg)
            bookmarks[idSvg].classList.remove("red")
            addNewPage(bookmarks)
        })
    })


}
function addItemDom (list) {
    const newHtml = JSON.parse(list).map(val => {
        return `<div class="book_item">
        ${val.image}
        <div class="name_et_book">
            ${val.name}
            <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20" class="bk" id = ${val.id}><g><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path></g></svg>
        </div>
    </div>`
    }).join("") 
    watchlistCon.innerHTML = newHtml
}

function checkSearch(data) {
    input.addEventListener("keyup", _=> {
        let inputList = []
        const List = splitWord(data)
        const inputVal = input.value.toLowerCase()
        inputList.push(...inputVal.split(""))
        let indexList = []
        List.forEach(Li => {
            if (inputList.every((char) => Li.includes(char))) {
                const itemIndex = List.indexOf(Li)
                indexList.push(itemIndex)
            }
        })
        const items = document.querySelectorAll(".item")
        items.forEach(item => {
            item.style.display = "none"
            more_btn.style.display = "none"
        })
        indexList.forEach(indexVal => {
            items[indexVal].style.display = "block"
        })
        if (inputList.length === 0) {
            more_btn.style.display = "block"
            more_btn.innerText = "...Less"
        }     
    })
    
}

function splitWord (data) {
    let gList = []
        data.forEach(eData => {
            let letterList = []
            let nameList = eData.name.split(" ")
            nameList.forEach( word => {
                letterList.push(...word.toLowerCase())
            })
            gList.push(letterList)
        })    
        return gList
}









