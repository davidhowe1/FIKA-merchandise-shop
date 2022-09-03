if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

let cart = document.getElementById('cart-row-container')

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
    let total = cartRowContainer.children.length
    cartTotal.innerText = total
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
    let title = item.getElementsByClassName('title')[0].innerText
    let price = item.getElementsByClassName('price')[0].innerText
    let imageSrc = image.getElementsByClassName('merch-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
    totalItems()
}

function addItemToCart(title, price, imageSrc) {
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
                                    <img class="image" src="${imageSrc}"></img>
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
    totalItems()
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
    let grandTotal = document.getElementsByClassName('grand-total')[0].innerText = "Grand Total: £" + total
}

let cartToggle = document.querySelector('#cart-toggle-tab')

cartToggle.addEventListener('click', toggleCart)

function toggleCart() {
    let toggleCart = document.getElementById('cart')
    let toggleButton = document.getElementById('cart-toggle-tab')
    toggleCart.classList.toggle('hide')
    toggleButton.classList.toggle('hide')

}