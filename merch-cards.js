let merchCards = [

    {
     id: "fikacoffeecup",
     pictureUrl: "pictures/fika1-square.jpg",
     alt: "FIKA Coffee Cup",
     title: "Fika Coffee Cup",
     description: "FIKA official coffee cups. Complete with a message of the day.",
     price: 3,
     inCart: 0
    },
 
    {
     id: "blondies",
     pictureUrl: "pictures/fika2-square.jpg",
     alt: "Closeup of FIKA Blondies",
     title: "Blondies",
     description: "Famous Fika Blondies. Indulge in these super fudgy delights!",
     price: 9,
     inCart: 0
    },
 
    {
     id: "pastramisandwich",
     pictureUrl: "pictures/fika3-square.jpg",
     alt: "Close up of FIKA Pastrami Sandwich",
     title: "Pastrami Sandwich",
     description: "Classic Pastrami, straight out of the NY deli, brought to you here in Liverpool.",
     price: 6,
     inCart: 0
    },
 
    {
     id: "royalbrownies",
     pictureUrl: "pictures/fika6.jpg",
     alt: "Closeup of FIKA brownies",
     title: "Royal Brownies",
     description: "Celebrate the Jubilee this year with these caramel cornflake brownies!",
     price: 6,
     inCart: 0
    },
 
    {
     id: "salamismorga",
     pictureUrl: "pictures/fika7.jpg",
     alt: "Closeup of FIKA Salami Smorga",
     title: "Salami Smorga",
     description: "Fresh salami and cheese smorga. An open sandwich and a simply gorgeous one at that",
     price: 6,
     inCart: 0
    },
 
    {
     id: "fikaboard",
     pictureUrl: "pictures/fika8.jpg",
     alt: "Closeup of FIKA board",
     title: "FIKA Board",
     description: "The famous Fika Board. Normally found with a message of the day.",
     price: 22,
     inCart: 0
    },
 
    {
     id: "fikacoffeecup",
     pictureUrl: "pictures/fika1-square.jpg",
     alt: "FIKA Coffee Cup",
     title: "Fika Coffee Cup",
     description: "FIKA official coffee cups. Complete with a message of the day.",
     price: 3,
     inCart: 0
    },
 
    {
     id: "blondies",
     pictureUrl: "pictures/fika2-square.jpg",
     alt: "Closeup of FIKA Blondies",
     title: "Blondies",
     description: "Famous Fika Blondies. Indulge in these super fudgy delights!",
     price: 9,
     inCart: 0
    },
 ];
 
 let htmlCode = ``;
 
 merchCards.forEach(function(merchCardObjects) {
     htmlCode = 
     htmlCode + 
     `
     <div id="${merchCardObjects.id}" class="merch-card">
         <div class="picture-wrapper"> 
             <img class="merch-image" src="${merchCardObjects.pictureUrl}" alt="${merchCardObjects.alt}">
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
 
 let merchCardsRendered = document.querySelector('.main-container')
 merchCardsRendered.insertAdjacentHTML('beforeend', htmlCode)

// Cart Code

let cartToggle = document.querySelector('#cart-toggle-tab')

cartToggle.addEventListener('click', toggleCart)

function toggleCart() {
    let toggleCart = document.getElementById('cart')
    let toggleButton = document.getElementById('cart-toggle-tab')
    toggleCart.classList.toggle('hide')
    toggleButton.classList.toggle('hide')
}

let addToCart = document.querySelectorAll('#buy-btn.add-to-cart')

for (let i = 0; i < addToCart.length; i++) {
    addToCart[i].addEventListener('click', () => {
        totalItems(merchCards[i]);
        totalCost(merchCards[i])
        showCartItems(merchCards[i])
    });
}

function onLoadCartItems() {
    let mobileCart = document.querySelector('#total')
    let productNumbers = localStorage.getItem('cart-total')

    if (productNumbers) {
        mobileCart.textContent = productNumbers
    }
}

function totalItems(item, action) {
    let productNumbers = localStorage.getItem('cart-total')
    productNumbers = parseInt(productNumbers)

    let mobileCart = document.querySelector('#total')
    
    if ( action == "decrease" ) {
        localStorage.setItem('cart-total', productNumbers - 1)
        mobileCart.textContent = productNumbers - 1

    } else if ( productNumbers ) {
        localStorage.setItem('cart-total', productNumbers + 1)
        mobileCart.textContent = productNumbers + 1
    } else {
        localStorage.setItem('cart-total', 1)
        mobileCart.textContent = 1
    }

    setItems(item)
}

function setItems(item) {
    let cartItems = localStorage.getItem('items-in-cart')
    cartItems = JSON.parse(cartItems)
    
    if (cartItems != null) {
        if (cartItems[item.title] == undefined) {
            cartItems = {
                ...cartItems,
                [item.title]: item
            }
        }
        cartItems[item.title].inCart += 1

    } else {
        item.inCart = 1
        cartItems = {
            [item.title]: item
        }
    }

    localStorage.setItem('items-in-cart', JSON.stringify(cartItems))
};

function totalCost(item, action) {
    let totalPrice = localStorage.getItem('total')

    if ( action == "decrease") {
        totalPrice = parseInt(totalPrice)
        localStorage.setItem('total', totalPrice - item.price)

    }   else if (totalPrice != null) {
        let = totalPrice = parseFloat(totalPrice)
        let cartTotal = localStorage.setItem('total', totalPrice + item.price)
        cartTotal = Math.round(cartTotal * 100) / 100
    } else {
        localStorage.setItem('total', item.price)
    }
};

function showCartItems() {
    let cartItems = localStorage.getItem('items-in-cart')
    let itemsContainer = document.querySelector('.cart-row-container')
    cartItems = JSON.parse(cartItems)

    let total = document.querySelector('.grand-total')
    let totalPrice = localStorage.getItem('total')
    totalPrice = Math.round(totalPrice * 100) / 100
    total.textContent = "Grand Total: £" + totalPrice


    if ( cartItems && itemsContainer ) {
        itemsContainer.innerHTML = ''
        Object.values(cartItems).map(item => {
            itemsContainer.innerHTML += `
            <div class="cart-row" id="${item.id}">
                <div class="row-container">
                    <img class="image" src="${item.pictureUrl}" alt="${item.alt}">
                    <div class="title">${item.title}</div>
                </div>
                <div class="row-container">
                    <div class="price"><p>£${item.price}</p></div>
                    <div class="quantity">
                        <ion-icon class="decrease" name="remove-circle-outline"></ion-icon>
                            <span class="quantity">${item.inCart}</span>
                        <ion-icon class="increase" name="add-circle-outline"></ion-icon>
                    </div>
                </div>
                <div class="row-container">
                    <button class="remove-item">Remove</button>
                </div>
            </div>
            `
        });
    }

    removeItems();
    manageQuantity()
}

function removeItems() {
    let removeButtons = document.querySelectorAll('.remove-item')
    let itemName;
    let itemNumbers = localStorage.getItem('cart-total')
    let cartItems = localStorage.getItem('items-in-cart')
    let cartTotal = localStorage.getItem('total')
    cartItems = JSON.parse(cartItems)

    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener('click', () => {
            itemName = removeButtons[i].parentElement.parentElement
            .firstElementChild.lastElementChild.textContent.trim()
            localStorage.setItem('cart-total', itemNumbers - cartItems[itemName].inCart)
            localStorage.setItem('total', cartTotal - ( cartItems[itemName].price * cartItems[itemName].inCart ))
            
            delete cartItems[itemName];
            localStorage.setItem('items-in-cart', JSON.stringify(cartItems))

            showCartItems()
            onLoadCartItems()
        })
    }
}

function manageQuantity() {
    let decrease = document.querySelectorAll('ion-icon.decrease')
    let increase = document.querySelectorAll('ion-icon.increase')
    let cartItems = localStorage.getItem('items-in-cart')
    let currentQuantity = 0
    let currentItem = ''
    cartItems = JSON.parse(cartItems)

    for (let i = 0; i < decrease.length; i++) {
        decrease[i].addEventListener('click', function() {
            currentQuantity = decrease[i].parentElement.textContent.trim()
            currentItem = decrease[i].parentElement.parentElement.parentElement.
            firstElementChild.querySelector('.title').textContent.trim()

            if (cartItems[currentItem].inCart > 1) {
                cartItems[currentItem].inCart -= 1
                totalItems( cartItems[currentItem], "decrease" )
                totalCost( cartItems[currentItem], "decrease" )
                localStorage.setItem('items-in-cart', JSON.stringify(cartItems))
                showCartItems()
            }
        })
    }

    for (let i = 0; i < increase.length; i++) {
        increase[i].addEventListener('click', function() {
            currentQuantity = increase[i].parentElement.textContent.trim()
            currentItem = increase[i].parentElement.parentElement.parentElement.
            firstElementChild.querySelector('.title').textContent.trim()

                cartItems[currentItem].inCart += 1
                totalItems( cartItems[currentItem])
                totalCost( cartItems[currentItem])
                localStorage.setItem('items-in-cart', JSON.stringify(cartItems))
                showCartItems()
        })
    }
}

manageQuantity()
onLoadCartItems()
showCartItems()