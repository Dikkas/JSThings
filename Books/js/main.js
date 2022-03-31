const released = document.getElementById("released");
const nextBooks = document.getElementById("soon");
const books = [];

function getData() {
    fetch("./resources/db.json")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            responseData(data.data);
        });
}

function responseData(data) {
    for (let i = 0; i < data.length; i++) {
        let { title, day, month, year, editora, cover } = data[i];
        books.push(objectCard(title, day, month, year, editora, cover));
    }
    console.log(books);
    books.sort((a, b) => a.daysLeft - b.daysLeft);
    writeData(books);
}

function writeData(data) {
    for (let i = 0; i < data.length; i++) {
        let { coverImg, badge, badgeText, title, relDate, daysLeft, editora } =
            data[i];
        if (badge === "success") {
            released.innerHTML += createCard(
                coverImg,
                badge,
                title,
                relDate,
                daysLeft,
                editora
            );
        } else {
            nextBooks.innerHTML += createCard(
                coverImg,
                badge,
                title,
                relDate,
                daysLeft,
                editora
            );
        }
    }
}

function createCard(coverImg, badge, title, relDate, daysLeft, editora) {
    return `<div class="card shadow-lg" style="width: 18rem;">
        <div class="img-div"><img src="${coverImg}" class="card-img-top"></div>
        <div class="card-body">
            <div class="badge bg-${badge} mb-3">
            ${daysLeft > 0 ? daysLeft + " days" : "Released"}
            </div>
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${relDate}</p>
            <p class="card-text">${editora}</p>
        </div>
    </div>`;
}

function objectCard(title, day, month, year, editora, cover) {
    let currentDate = new Date();
    let badge = "danger";

    let relDate = `${day ? day + "/" : ""}${month ? month + "/" : ""}${year}`;

    // To set two dates to two variables
    var date1 = new Date();

    // 0-11 is Month in JavaScript
    var date2 = new Date(year, month - 1 || 11, day || 31);
    console.log(date2, title);
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    let daysLeft = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));

    if (daysLeft <= 0) {
        badge = "success";
    }

    let coverImg = cover ? cover : "./resources/nocover.png";

    return { coverImg, badge, title, relDate, daysLeft, editora };
}

getData();
