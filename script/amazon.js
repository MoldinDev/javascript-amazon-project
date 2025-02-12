let productsHtml = ""
let cart = {}


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

  document.querySelectorAll('.add-to-cart-button').forEach((addButton, index) => {
    addButton.addEventListener('click', (e) => {
      cart.push(products[1])
      document.querySelector('.cart-quantity').innerHTML = 4
    })
  })
  
})

document.querySelector('.products-grid').innerHTML = productsHtml

document.querySelectorAll('.add-to-cart-button').forEach((button, index) => {
  const option = document.querySelectorAll('.pqc')
  const productId = button.dataset.productId
  button.addEventListener('click', ()=> {
    if (cart[productId]){
      cart[productId] += Number(option[index].value)
    } else {
      cart[productId] = Number(option[index].value)
    }
    let cartCount = 0
    for (let key in cart) {
      cartCount += cart[key]
    }
    document.querySelector('.cart-quantity').innerHTML = cartCount
    console.log(cart)
  })
})