$(document).ready(function () {
    // Get the category name parameter from the URL
    var urlParams = new URLSearchParams(window.location.search);
    var category = urlParams.get('category');

    // Make an AJAX request to the API endpoint with the category name
    $.ajax({
        url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
        method: 'GET',
        success: function (response) {
            // Handle the category detail response
            console.log(response);
            // You can display the list of meals with their images
            let mealListContainer = document.getElementById('mealListContainer');
            let mealCards = '';

            response.meals.forEach(function (meal) {
                mealCards += `  <div class="card text-white" data-category="${meal.idMeal}">
                <img src="${meal.strMealThumb}" class="card-img" alt="...">
                  <div class="card-img-overlay bg-dark text-center d-flex justify-content-center align-items-center bg-opacity-50">
                    <h5 class="card-title">${meal.strMeal}</h5>
                  </div>
                </div>`

            });
            mealListContainer.innerHTML = mealCards;
            var cardButtons = document.querySelectorAll('.card-img-overlay');
            cardButtons.forEach(function (button) {
                button.addEventListener('click', function (event) {
                    event.preventDefault();
                    var mealId = this.parentNode.getAttribute('data-category');; // Get the category name from the card title
                    redirectToMealDetail(mealId);
                });
            });
        },

        error: function (error) {
            console.log(error);
        }
    });
});

// Function to redirect to the Meal Detail page with the meal ID parameter
function redirectToMealDetail(mealId) {
    window.location.href = `/meal-detail/meal-detail.html?mealId=${encodeURIComponent(mealId)}`;
}