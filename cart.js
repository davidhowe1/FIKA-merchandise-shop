if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

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

function ready() {
    
updateCartTotal()

let addToCart = document.getElementsByClassName('add-to-cart')
for (let i = 0; i < addToCart.length; i++) {
    let button = addToCart[i]
    button.addEventListener('click', addToCartClicked)
}

let removeButton = document.getElementsByClassName('remove-item')
for (let i = 0; i < removeButton.length; i++) {
    let button = removeButton[i]
    button.addEventListener('click', function (event) {
        let buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()
    })
}

var quantityInputs = document.getElementsByClassName('quantity')
for (let i = 0; i < removeButton.length; i++) {
    input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
}

document.getElementsByClassName('checkout')[0].addEventListener('click', 
purchaseClicked)

}

let cartTotal = document.querySelector('.total')
cartTotal.innerText = '0'

function totalItems() {
    let cartRowContainer = document.querySelector('.cart-row-container')
    let mobileCart = document.querySelector('#total')
    let total = cartRowContainer.children.length
    localStorage.setItem('total-items', total)
    let totalItems = localStorage.getItem('total-items')
    mobileCart.textContent = totalItems
}

function onLoadCartContent() {
    let totalItems = localStorage.getItem('total-items')
    let mobileCart = document.querySelector('#total')

    if (totalItems) {
        mobileCart.textContent = totalItems
    }
}

function purchaseClicked() {
    alert("Thank you for your purchase")
    let cartItems = document.getElementsByClassName('cart-row-container')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    let button = event.target
    let item = button.parentElement
    let image = button.parentElement.parentElement
    let imageAlt = image.getElementsByClassName('merch-image')[0].alt
    let title = item.getElementsByClassName('title')[0].innerText
    let price = item.getElementsByClassName('price')[0].innerText
    let imageSrc = image.getElementsByClassName('merch-image')[0].src
    addItemToCart(title, price, imageSrc, imageAlt)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc, imageAlt) {
    let cartRow = document.createElement('div')
    let cartItems = document.getElementsByClassName('cart-row-container')[0]
    cartItemNames = cartItems.getElementsByClassName('title')
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already in your cart')
            return
        }
    }
    let cartRowContents = `<div class="cart-row" id="cart-row">
                                <div class="row-container">
                                    <img class="image" src="${imageSrc}" alt="${imageAlt}"></img>
                                    <div class="title">${title}</div>
                                </div>
                                <div class="row-container">
                                    <div class="price"><p>${price}</p></div>
                                    <input class="quantity" type="number" value="1">
                                </div>
                                <div class="row-container">
                                    <button class="remove-item">&#x2715</button>
                                </div>
                            </div>`
    cartItems.append(cartRow)
    cartRow.innerHTML = cartRowContents
    cartRow.getElementsByClassName('remove-item')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('quantity')[0].addEventListener('change', quantityChanged)
}

function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0 ) {
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')

    total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        cartPrice = cartRow.getElementsByClassName('price')[0]
        cartQuantity = cartRow.getElementsByClassName('quantity')[0]
        let price = parseFloat(cartPrice.innerText.replace('£', ''))
        let quantity = cartQuantity.value
        total = total + (price * quantity)
    }
    
    total = Math.round(total * 100) / 100
    let grandTotal = document.getElementsByClassName('grand-total')[0].innerText = "Total: £" + total
}

let cartToggle = document.querySelector('#cart-toggle-tab')

cartToggle.addEventListener('click', toggleCart)

function toggleCart() {
    let toggleCart = document.getElementById('cart')
    let toggleButton = document.getElementById('cart-toggle-tab')
    toggleCart.classList.toggle('hide')
    toggleButton.classList.toggle('hide')
}