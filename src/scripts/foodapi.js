const url = "http://localhost:8088/food"

const foodContainer = document.querySelector(".foodList")

const foodFactory = (food) => {
    return `
    <ul>
        <li class="name"><strong>${food.name}</strong></li>
        <li class="category">${food.category}</li>
        <li class="ethnicity"><em>${food.ethnicity}</em></li>
        <li class="barcode">${food.barcode}</li>
        <li class="country">From ${food.country}</li>
        <li class="calories">Calories: ${food.calories}</li>
        <li class="fat">Fat content: ${food.fat}</li>
        <li class="sugar">Sugar content: ${food.sugar}</li>
        <li class=""ingredients>${food.ingredients}</li>
        </ul>`
};


const addFoodToDom = (foodAsHTML) => {
    foodContainer.innerHTML += foodAsHTML
};

fetch(url)
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            console.log(food)

            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(resp => resp.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                        food.ingredients = productInfo.product.ingredients_text
                    } else {
                        food.ingredients = "no ingredients listed"
                    }

                    if (productInfo.product.countries) {
                        food.country = productInfo.product.countries
                    } else {
                        food.country = "no country of origin known"
                    }

                    if (productInfo.product.nutriments.energy_serving) {
                        food.calories = productInfo.product.nutriments.energy_serving
                    } else {
                        food.calories = "calorie count unknown"
                    }

                    if (productInfo.product.nutriments.fat_serving) {
                        food.fat = productInfo.product.nutriments.fat_serving
                    } else {
                        food.fat = "fat content unknown"
                    }

                    if (productInfo.product.nutriments.sugars_serving) {
                        food.sugar = productInfo.product.nutriments.sugars_serving
                    } else {
                        food.sugar = "sugar content unknown"
                    }


                    const foodAsHTML = foodFactory(food)

                    addFoodToDom(foodAsHTML)
                })
        })
    });

