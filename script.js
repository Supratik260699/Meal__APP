//global variables
var search_input = document.getElementById("input-search-value");
// var meal_cards = document.getElementById("meal-cards");
var meal_box = document.getElementById("meal");
var favorite_items = document.getElementById("favorite-items");
var search_submit = document.getElementById("search-input-button");

var arrfavorites = [];


// var storedFavorites = JSON.parse(localStorage.getItem("arrfavorites"));

//added event listner for search when anykey is pressed it will fetch data from api
search_input.addEventListener("keydown", function(){

    console.log(search_input.value);
    getList(search_input.value);
})


//adding meal id's in array and then storing this array in local storage for favorites page
function addTofavorites(meal_id,meal_title)
{
     arrfavorites.push(meal_id);
     localStorage.setItem('arrfavorites', arrfavorites);
     console.log(meal_id);
    alert(`Your ${meal_title} Successfully add to favorites`);
}

var mealID = "";
var mealTitle = "";

//adding meal id in local storge for accessing data in details page
function addMealIdToLocal(meal_id,meal_title){
    console.log("Clicked to see more");
    localStorage.setItem('mealID', meal_id);
    localStorage.setItem('mealTitle', meal_title);
}

//fetching all data from api
 function getList(search_text){
    console.log(search_text);
    //fetching data by search text
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search_text}`)
    .then(res=>res.json())
    .then(data => {
        let html = "";
        console.log(data);
        if(data.meals){
            //itrating array present in data
            data.meals.forEach(meal => {
                //adding cards in meals box div
                html += `
                    <div class="card" id = "${meal.idMeal}" style="width: 18rem; margin-bottom:3%; border-radius: 30px; overflow:hidden">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="Meal App">
                    <div class="card-body">
                      <h5 class="card-title">${meal.strMeal}</h5>
                      <a href="detailsPage.html" id = "show-more" onclick="return addMealIdToLocal(${meal.idMeal},'${meal.strMeal}')" class="btn btn-primary">See More Details</a>
                      <button type = "submit" onclick = "addTofavorites(${meal.idMeal},'${meal.strMeal}')" class="btn btn-primary" style="margin-top: 3%; ">Add To Favorites</button>
                    </div>
                  </div>
                `;
            });
        } else{
            html = `<h3 >Sorry! We Did'nt find anything related to "<b style="color:red;">${search_text}</b>"</h3>` ;
        }

        meal_box .innerHTML = html;
    })
}

