//global variables
var meal_box = document.getElementById("meal");

var arrfavorites = localStorage.getItem('arrfavorites');
var displayArr = [];

var mealID = "";
var mealTitle = "";

//For details page adding meal id to local storage
function addMealIdToLocal(meal_id, meal_title) {
    console.log("Clicked to see more");
    localStorage.setItem('mealID', meal_id);
    localStorage.setItem('mealTitle', meal_title);
}

//removing meals from favorite page
function removeFromfavorites(meal_id) {
    displayArr = displayArr.filter(e => e != meal_id);
    let mid = document.getElementById(meal_id);
    mid.parentNode.removeChild(mid);
    console.log(mid);

    if (displayArr == null || displayArr.length == 0) {
        arrfavorites = [];
        localStorage.setItem('arrfavorites', arrfavorites);
        let html = `<div><h1>You Don't have any favorites yet...Please Add Some Item in Favorites, Thank You!</h1></div>`;
        meal_box.innerHTML = html;
    }
}

//displaying all the meals added from home.
function favoriteItemsPage() {
    //if favorite page don't have any meals
    if (arrfavorites == null || arrfavorites.length == 0) {
        let html = `<div><h1> You Don't have any favorites yet...Please Add Some Item in Favorites, Thank You!</h1></div>`;
        meal_box.innerHTML = html;
    }
    else {
        let meal_id = "";
        for (let data of arrfavorites) {
            if (data != ',')
                meal_id += data;
            else {
                displayArr.push(parseInt(meal_id));
                meal_id = "";
            }
        }
        displayArr.push(parseInt(meal_id));
        let html = "";
        for (let mealId of displayArr) {
            //fetching the data from api
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    //appending meals card in meal box div
                    html += `
                    <div class="card" id = "${data.meals[0].idMeal}" style="width: 18rem; margin-bottom:3%; border-radius: 30px; overflow:hidden">
                    <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="Meal App">
                    <div class="card-body">
                      <h5 class="card-title">${data.meals[0].strMeal}</h5>
                      <a href="detailsPage.html" id = "show-more" onclick="return addMealIdToLocal(${data.meals[0].idMeal},'${data.meals[0].strMeal}')" class="btn btn-primary">See More Details</a>
                      <button type = "submit" onclick = "removeFromfavorites(${data.meals[0].idMeal})" class="btn btn-primary" style="margin-top: 3%; ">Remove From Favorites</button>
                    </div>
                  </div>
                `;
                    meal_box.innerHTML = html;
                });

        }


    }
}
