var api_url = "data.json"

document.addEventListener('DOMContentLoaded', function() {


    dailyData();
    
 });

 function setActive(stringActive){
    var daily_element = document.getElementById("daily");
    var weekly_element = document.getElementById("weekly");
    var monthly_element = document.getElementById("monthly");

    switch(stringActive){
        case "daily":
            document.getElementById("daily").classList.add("active");
            document.getElementById("weekly").classList.remove("active");
            document.getElementById("monthly").classList.remove("active");
            break;

        case "weekly":
            document.getElementById("daily").classList.remove("active");
            document.getElementById("weekly").classList.add("active");
            document.getElementById("monthly").classList.remove("active");
            break;

        case "monthly":
            document.getElementById("daily").classList.remove("active");
            document.getElementById("weekly").classList.remove("active");
            document.getElementById("monthly").classList.add("active");
            break;
    }
 }

function dailyData(){

    setActive("daily");
    dataFetch("daily", "Yesterday - ")
}

function weekData(){
    setActive("weekly");
    dataFetch("weekly", "Last Week - ")
}

function monthData(){
    setActive("monthly");
    dataFetch("monthly", "Last Month - ")
}

function dataFetch(timeSpan, stringText){
    fetch(api_url)
    .then(response => response.json())
    .then(data => {
        writeText(data, timeSpan, stringText)
    });
}
function writeText(data, timeSpan, stringText){

    title_text = document.querySelectorAll(".title");
    current_data = document.querySelectorAll(".current");
    previous_data = document.querySelectorAll(".previous");
      for (let index = 0; index < data.length; index++) {

        const getValue = key => {
            const { [key]: returnValue } = data[index].timeframes;   
            return returnValue;
        }

          const time = getValue(timeSpan);
          title_text[index].innerText = data[index].title;
          current_data[index].innerText = time.current +"hrs";;
          previous_data[index].innerText = stringText + time.previous +"hrs";;
          
      }

}
