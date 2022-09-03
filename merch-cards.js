const merchCardsArray = [
   {
    id: 1,
    pictureUrl: "pictures/fika1-square.jpg",
    title: "Fika Coffee Cup",
    description: "FIKA official coffee cups. Complete with a message of the day.",
    price: "2.99"
   },

   {
    id: 2,
    pictureUrl: "pictures/fika2-square.jpg",
    title: "Blondies",
    description: "Famous Fika Blondies. Indulge in these super fudgy delights!",
    price: "8.99"
   },

   {
    id: 3,
    pictureUrl: "pictures/fika3-square.jpg",
    title: "Pastrami Sandwich",
    description: "Classic Pastrami, straight out of the NY deli, brought to you here in Liverpool.",
    price: "5.99"
   },

   {
    id: 4,
    pictureUrl: "pictures/fika6.jpg",
    title: "Royal Brownies",
    description: "Celebrate the Jubilee this year with these caramel cornflake brownies!",
    price: "5.99"
   },

   {
    id: 5,
    pictureUrl: "pictures/fika1-square.jpg",
    title: "Salami Smorga",
    description: "Fresh salami and cheese smorga. An open sandwich and a simply gorgeous one at that",
    price: "7.99"
   },

   {
    id: 6,
    pictureUrl: "pictures/fika2-square.jpg",
    title: "FIKA Board",
    description: "The famous Fika Board. Normally found with a message of the day.",
    price: "20.99"
   },

   {
    id: 7,
    pictureUrl: "pictures/fika3-square.jpg",
    title: "Fika Coffee Cup",
    description: "FIKA official coffee cups. Complete with a message of the day.",
    price: "2.99"
   },

   {
    id: 8,
    pictureUrl: "pictures/fika6.jpg",
    title: "Blondies",
    description: "Famous Fika Blondies. Indulge in these super fudgy delights!",
    price: "8.99"
   },

]

let htmlCode = ``;

merchCardsArray.forEach(function(merchCardObjects) {
    htmlCode = 
    htmlCode + 
    `
    <div id="${merchCardObjects.id}" class="merch-card">
        <div class="picture-wrapper"> 
            <img class="merch-image" src="${merchCardObjects.pictureUrl}">
        </div>

        <div class="text-wrapper">
            <h2 class="title" >${merchCardObjects.title}</h2>
            <h3 class="price">£${merchCardObjects.price}</h3>
            <p class="description" >${merchCardObjects.description}</p>

            <button class="add-to-cart" id="buy-btn">Add to Cart</button>
        </div>
            
    </div>
    `
});

const merchCardsRendered = document.querySelector('.main-container')
merchCardsRendered.insertAdjacentHTML('beforeend', htmlCode)
