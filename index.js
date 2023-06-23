
$.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/categories.php",
    method: "GET",
    success: function(response) {
        // Get the meal categories from the API response
        const mealCategories = response.categories;

        // Get the container element to append the cards
        let mealCategoryContainer = $("#mealCategoryContainer");
        let card = '';

        // Loop through the meal categories and create cards
        response.categories.forEach(function (category) {
            card += `
              <div class="card text-white" data-category="${category.strCategory}">
              <img src="${category.strCategoryThumb}" class="card-img" alt="...">
                <div class="card-img-overlay bg-dark text-center d-flex justify-content-center align-items-center bg-opacity-50">
                  <h5 class="card-title">${category.strCategory}</h5>
                </div>
              </div>
            `

            // Append the card to the container
          }
          );
          mealCategoryContainer.html(card) 


        var cardButtons = document.querySelectorAll('.card-img-overlay');
        cardButtons.forEach(function(button) {
          button.addEventListener('click', function(event) {
            event.preventDefault();
            var category = this.parentNode.getAttribute('data-category'); // Get the category name from the card title
            getCategoryDetail(category);
          });
        });
      },
    error: function(error) {
        console.log("An error occurred:", error);
    }
});

function getCategoryDetail(category) {
    window.location.href = `/category-detail/category-detail.html?category=${encodeURIComponent(category)}`;
}
