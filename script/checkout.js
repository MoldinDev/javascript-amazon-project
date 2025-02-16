import {products} from '../data/products.js'
import { cart, checkoutCalculate, deleteHtml, updateCart } from '../data/cart.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

const today = dayjs()
const next1 = today.add(1, 'days').format('dddd, MMMM DD')
const next3 = today.add(3, 'days').format('dddd, MMMM DD')
const next7 = today.add(7, 'days').format('dddd, MMMM DD')

// Kalau cart kosong, navigate ke amazon.html
if (Object.keys(cart) <= 0) {
  window.location.href = 'amazon.html'
}

const productss = products
let cartHtml = ''
let subTotalCost = 0
let totalItems = 0
let totalBeforeTax = 0
let tax = 0
const shippingCost = []

// Get Cart items (id -> object)
let cartItems = productss.filter(product => Object.keys(cart).includes(product.id))
console.log(cartItems[0]['id'])
cartItems.forEach((cartItem, index) => {
  cartItems[index]['count'] = cart[cartItem['id']]
})


// Generate html cart
cartItems.forEach((cartItem, index) => {
  shippingCost[index] = 0
  const html = `
            <div class="cart-item-container container-${cartItem.id}">
            <div class="delivery-date">
              ${next7}
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
                  data-delivery-date='${next7}'
                  data-index=${index}
                  data-sc=0
                    class="delivery-option-input"
                    name="delivery-option-${index}">
                  <div>
                    <div class="delivery-option-date">
                      ${next7}
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                  data-delivery-date='${next3}'
                  data-index=${index}
                  data-sc=499
                    class="delivery-option-input"
                    name="delivery-option-${index}">
                  <div>
                    <div class="delivery-option-date">
                       ${next3}
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                  data-delivery-date='${next1}'
                  data-index=${index}
                  data-sc=999
                    class="delivery-option-input"
                    name="delivery-option-${index}">
                  <div>
                    <div class="delivery-option-date">
                       ${next1}
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

// Render cart items html display
document.querySelector('.order-summary').innerHTML = cartHtml

document.querySelectorAll('input[type="radio"]').forEach((radio) => {
  radio.addEventListener('change', () => {
    const deliveryDate = radio.dataset.deliveryDate
    const titleIndex = radio.dataset.index
    const deliveryCost = radio.dataset.sc
    document.querySelectorAll('.delivery-date').forEach((title, index) => {
      if(index == titleIndex) {
        title.innerHTML = deliveryDate
        shippingCost[titleIndex] = deliveryCost
        console.log(shippingCost)
      }
    })
        
        // Update total before tax
        totalBeforeTax = subTotalCost + eval(shippingCost.join('+'))
        tax = (subTotalCost+eval(shippingCost.join('+'))) * 0.1
        
        // Update count render
        checkoutCalculate(totalItems, totalBeforeTax, tax, subTotalCost, eval(shippingCost.join('+')))
  })
})

totalBeforeTax = (subTotalCost + eval(shippingCost.join('+')))
tax = (subTotalCost+eval(shippingCost.join('+'))) * 0.1

// Render Calculated cost
checkoutCalculate(totalItems, totalBeforeTax, tax, subTotalCost, eval(shippingCost.join('+')))


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
    if (subTotalCost <= 0) {
      window.location.href = 'amazon.html'
    }
  })
})
