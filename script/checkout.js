import {products} from '../data/products.js'
import { cart, checkoutCalculate, deleteHtml, updateCart } from '../data/cart.js'

const productss = products
let cartHtml = ''
let subTotalCost = 0
let totalItems = 0
let totalBeforeTax = 0
let tax = 0
const shippingCost = 499

// Get Cart items (id -> object)
console.log(cart)
let cartItems = productss.filter(product => Object.keys(cart).includes(product.id))
console.log(cartItems[0]['id'])
cartItems.forEach((cartItem, index) => {
  cartItems[index]['count'] = cart[cartItem['id']]
})


// Generate html cart
cartItems.forEach((cartItem, index) => {
  const html = `
            <div class="cart-item-container container-${cartItem.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${cartItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${cartItem.name}
                </div>
                <div class="product-price">
                  $${cartItem.priceCents/100}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.count}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary" data-product-id="${cartItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${index}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${index}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${index}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `
  totalItems += cartItem.count
  cartHtml += html
  subTotalCost += (cartItem.priceCents * cartItem.count)

})

totalBeforeTax = (subTotalCost + shippingCost)
tax = (subTotalCost+shippingCost) * 0.1

// Render cart items html display
document.querySelector('.order-summary').innerHTML = cartHtml

// Render Calculated cost
checkoutCalculate(totalItems, totalBeforeTax, tax, subTotalCost)


document.querySelectorAll('.delete-quantity-link').forEach((deleteBtn) => {
  deleteBtn.addEventListener('click', () => {
    const productId = deleteBtn.dataset.productId
    const pengurang = cartItems.filter((cartItem) => cartItem.id == productId)[0]['count']
    totalItems = totalItems - pengurang
    subTotalCost = 0
    totalBeforeTax = 0
    tax = 0

    deleteHtml(productId)
    
    // Update cart items
    cartItems = cartItems.filter((cartItem) => productId != cartItem.id)
    updateCart(cartItems)
    
    // Update subtotal cost
    cartItems.forEach((cartItem) => {
      subTotalCost += (cartItem.priceCents * cartItem.count)
    })
    
    // Update total before tax
    totalBeforeTax = subTotalCost + shippingCost
    tax = (subTotalCost+shippingCost) * 0.1
    
    // Update count render
    checkoutCalculate(totalItems, totalBeforeTax, tax, subTotalCost)
  })
})