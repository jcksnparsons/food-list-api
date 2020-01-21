const url = "http://localhost:8088/food"

const foodContainer = document.querySelector(".foodList")

const foodFactory = (food) => {
    return `<ul><li><strong>${food.name}</strong></li><li>${food.category}</li><li><em>${food.ethnicity}</em></li></ul>`
};


const addFoodToDom = (foodAsHTML) => {
    foodContainer.innerHTML += foodAsHTML
};

fetch(url)
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            const foodAsHTML = foodFactory(food)
            addFoodToDom(foodAsHTML)
        })
    })