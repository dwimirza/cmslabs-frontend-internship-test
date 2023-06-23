$(document).ready(function () {
    let urlParams = new URLSearchParams(window.location.search);
    let mealId = urlParams.get('mealId');

    $.ajax({
        url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
        method: 'GET',
        success: function (response) {
            console.log(response);
            let mealsDetail = document.getElementById('meals-detail');
            let mealName = document.getElementById('meal-name');
            let category = document.getElementById('category-name');
            let mealDetail = '';

            response.meals.forEach(function (meal) {
                let youtubeUrl = meal.strYoutube
                let youtubeEmbed = youtubeUrl.replace('watch?v=', 'embed/')
                mealDetail += `
                <div class="container">
                <div class="row">
                  <div class="column meal-name">
                    <h1 class="m-0">${meal.strMeal}</h1>
                    <p class="text-category">${meal.strCategory}</p>
                    <img src="${meal.strMealThumb}" alt="" class="img-detail">
                  </div>
                  <div class="column ms-4 ingredients">
                    <h3 class="text-opacity-50">Ingredients</h3>
                    <ul>
                      ${generateIngredients(meal)}
                    </ul>
                  </div>
                  </div>
                  <div class="instructions">
                  <h1 class="mt-3">Instructions</h1>
                  <p>${meal.strInstructions}</p>
                  </div>
                    <div class="embed">
                  <h1 class="text-center mt-5">Video Tutorial</h1>
                  <iframe width="560" height="700" src="${youtubeEmbed}" title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>
                    </div>
              </div>
                `
                mealName.innerHTML = meal.strMeal
                category.innerHTML = meal.strCategory
                 },)

              function generateIngredients(meal) {
                let ingredientsList = '';
                for (let i = 1; i <= 20; i++) {
                  const ingredient = meal[`strIngredient${i}`];
                  const measure = meal[`strMeasure${i}`];

                  // Check if ingredient and measure exist
                  if (ingredient && measure) {
                    ingredientsList += `<li>${measure} ${ingredient}</li>`;
                  }
                }
                return ingredientsList;
              }
            mealsDetail.innerHTML = mealDetail
        }
    })
})