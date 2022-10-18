//Getting meal id's stored in local storage 
var mealID = localStorage.getItem('mealID');
var mealTitle = localStorage.getItem('mealTitle');
var meal_result_title = document.getElementById('meal_result_title');
var meal_box = document.getElementById("meal");

let result_title = `Find Details Of <b>${mealTitle}.</b> Below...!`;
meal_result_title.innerHTML = result_title;

let html = ""
function detailsItemsPage() {
    //fetching data using meal id
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            //adding card to meal box div
            html = `
        <div id = "detailspage-cards" class="card mb-3">
        <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${mealTitle}</h5>
        <p class="card-text">${data.meals[0].strInstructions}</p>
        <p class="card-text"><small class="text-muted">Youtube: <a href ="${data.meals[0].strYoutube}"> Click here to watch on Youtube</a></small></p>
        </div>
    </div>
    `;
            meal_box.innerHTML = html;
        });
}
