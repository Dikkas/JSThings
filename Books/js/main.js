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
        let { title, day, month, year, editora, cover, bought } = data[i];
        books.push(objectCard(title, day, month, year, editora, cover, bought));
    }
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
        } else if (badge === "info") {
            boughtBooks.innerHTML += createCard(
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
            <p class="card-text">${editora}</p>
        </div>
    </div>`;
}

function objectCard(title, day, month, year, editora, cover, bought) {
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

    return { coverImg, badge, title, relDate, daysLeft, editora };
}

getData();
