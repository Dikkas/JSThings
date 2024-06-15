const released = document.getElementById("released");
const nextBooks = document.getElementById("soon");
const boughtBooks = document.getElementById("bought");
const books = [];

function getData() {
    fetch("./resources/db.json")
        .then((response) => response.json())
        .then((data) => {
            responseData(data.data);
        });
}

function responseData(data) {
    for (let i = 0; i < data.length; i++) {
        let { title, day, month, year, editora, cover, bought, author } = data[i];
        books.push(objectCard(title, day, month, year, editora, cover, bought, author));
    }
    books.sort((a, b) => a.daysLeft - b.daysLeft);
    writeData(books);
}

function writeData(data) {
    for (let i = 0; i < data.length; i++) {
        let { coverImg, badge, title, relDate, daysLeft, editora, author } =
            data[i];
        if (badge === "success") {
            released.innerHTML += createCard(
                coverImg,
                badge,
                title,
                relDate,
                daysLeft,
                editora,
                author
            );
        } else if (badge === "info") {
            boughtBooks.innerHTML += createCard(
                coverImg,
                badge,
                title,
                relDate,
                daysLeft,
                editora,
                author
            );
        } else {
            nextBooks.innerHTML += createCard(
                coverImg,
                badge,
                title,
                relDate,
                daysLeft,
                editora,
                author
            );
        }
    }
}

function createCard(coverImg, badge, title, relDate, daysLeft, editora, author) {
    return `<div class="card shadow-lg" style="width: 18rem;">
        <div class="img-div"><img src="${coverImg}" class="card-img-top"></div>
        <div class="card-body">
            <div class="badge bg-${badge} mb-3">
            ${
                daysLeft > 0
                    ? daysLeft + " days"
                    : badge == "info"
                    ? "Bought"
                    : "Released"
            }
            </div>
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${relDate}</p>
            <p class="card-text">${author}</p>
            <p class="card-text">${editora}</p>
        </div>
    </div>`;
}

function objectCard(title, day, month, year, editora, cover, bought, author) {
    let relDate = `${day ? day + "/" : ""}${month ? month + "/" : ""}${year}`;

    // To set two dates to two variables
    var date1 = new Date();

    let monthUse = month - 1 == 0 ? 0 : month - 1 || 11;
    // 0-11 is Month in JavaScript
    var date2 = new Date(year, monthUse, day || 31);
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    let daysLeft = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));

    let badge = "danger";

    if (daysLeft <= 0) {
        badge = "success";
    }

    if (bought) {
        badge = "info";
    }

    let coverImg = cover ? cover : "./resources/nocover.png";

    return { coverImg, badge, title, relDate, daysLeft, editora, author };
}

function myFunction(){
    const elements = document.getElementsByClassName("card shadow-lg")
    for (var i = elements.length - 1; i >= 0; --i) {
        elements[i].remove();
      }

    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    writeFilterData(books, filter);
}

function writeFilterData(data, filter) {
    for (let i = 0; i < data.length; i++) {
        let { coverImg, badge, title, relDate, daysLeft, editora, author } =
            data[i];
        if (badge === "success" && (filterCheck(title, editora, author, filter))) {
            released.innerHTML += createCard(
                coverImg,
                badge,
                title,
                relDate,
                daysLeft,
                editora,
                author
            );
        } else if (badge === "info" && (filterCheck(title, editora, author, filter))) {
            boughtBooks.innerHTML += createCard(
                coverImg,
                badge,
                title,
                relDate,
                daysLeft,
                editora,
                author
            );
        } else if (filterCheck(title, editora, author, filter)){
            nextBooks.innerHTML += createCard(
                coverImg,
                badge,
                title,
                relDate,
                daysLeft,
                editora,
                author
            );
        }
    }
}

function filterCheck(title, editora, author, filter){
    return (title.toUpperCase().includes(filter) || editora.toUpperCase().includes(filter) || author.toUpperCase().includes(filter))
}

getData();
