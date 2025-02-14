import {cart as caret, addToCart, totalCart, removePopUpEffect} from '../data/cart.js'
import {products} from '../data/products.js'

let productsHtml = ""
const cart = caret

products.forEach((product) => {
  const html = `
  <div class="product-container">
            <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.priceCents/100}
          </div>

          <div class="product-quantity-container">
            <select class="pqc">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
  `

  productsHtml += html
  
})

let productContainer = document.querySelector('.products-grid');
if (productContainer) productContainer.innerHTML = productsHtml;

document.querySelectorAll('.add-to-cart-button').forEach((button, index) => {
  const option = document.querySelectorAll('.pqc')
  const productId = button.dataset.productId
  const addedPopUp = document.querySelectorAll('.added-to-cart')[index]
  let removePopUp

  
  button.addEventListener('click', ()=> {
    
    addToCart(productId, option, index)

    // Menambahkan pop-up saat 'Add to cart' ditekan
    addedPopUp.classList.add('opacity-1')
    clearTimeout(removePopUp)
    removePopUp = removePopUpEffect(addedPopUp)

    
    document.querySelector('.cart-quantity').innerHTML = totalCart(cart)
  })
})
