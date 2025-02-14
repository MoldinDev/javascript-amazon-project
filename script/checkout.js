import {products} from '../data/products.js'
import { cart } from '../data/cart.js'

const productss = products
let cartHtml = ""
let subTotalCost = 0
let totalItems = 0
const shippingCost = 499

let cartItems = productss.filter(product => Object.keys(cart).includes(product.id))
console.log(cartItems[0]['id'])
cartItems.forEach((cartItem, index) => {
  cartItems[index]['count'] = cart[cartItem['id']]
})

console.log(cartItems)

cartItems.forEach((cartItem, index) => {
  const html = `
            <div class="cart-item-container">
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
                  <span class="delete-quantity-link link-primary">
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

const totalBeforeTax = (subTotalCost + shippingCost)
const tax = (subTotalCost+shippingCost) * 0.1

document.querySelector('.checkout-header-middle-section').innerHTML = `Items (${totalItems})`
document.querySelector('.total-before-tax').innerHTML = '$' + totalBeforeTax/100
document.querySelector('.estimated-tax').innerHTML = '$' + Math.round(tax)/100
document.querySelector('.total-items').innerHTML = `Items (${totalItems})`
document.querySelector('.sub-total-cost').innerHTML = '$' + subTotalCost/100
document.querySelector('.order-summary').innerHTML = cartHtml
document.querySelector('.total-cost').innerHTML = '$' + Math.round(totalBeforeTax + tax)/100
