export const cart = JSON.parse(localStorage.getItem('cart'))

function saveToStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(cart, productId, option, index) {
  console.log({'cart before proccess': cart})
  let newCart = {}
  for (let key in cart) {
    newCart[key] = cart[key]
  }
  console.log({newCart})
  if (cart[productId]){
    newCart[productId] += Number(option[index].value)
  } else {
    newCart[productId] = Number(option[index].value)
  }

  saveToStorage(newCart)
  return newCart
}

export function totalCart(cartItems) {

  let cartCount = 0
  let cart = cartItems
  for (let key in cart) {
    cartCount += cart[key]
  }
  return Number(cartCount)

}

export function updateCart(cartItems) {
  let newCart = {}
  
  cartItems.forEach((cartItem) => {
    newCart[cartItem.id] = cartItem.count
  })

  saveToStorage(newCart)
}

export function deleteHtml(id) {
  const container = document.querySelector(`.container-${id}`)
  container.remove()
}

export function removePopUpEffect(element) {
  return setTimeout(() => {
    element.classList.remove('opacity-1')
  },1500)
}

export function checkoutCalculate(totalItems, totalBeforeTax, tax, subTotalCost, shippingCost) {
  document.querySelector('.checkout-header-middle-section').innerHTML = `Items (${totalItems})`
  document.querySelector('.total-before-tax').innerHTML = '$' + totalBeforeTax/100
  document.querySelector('.estimated-tax').innerHTML = '$' + Math.round(tax)/100
  document.querySelector('.total-items').innerHTML = `Items (${totalItems})`
  document.querySelector('.sub-total-cost').innerHTML = '$' + subTotalCost/100
  document.querySelector('.total-cost').innerHTML = '$' + Math.round(totalBeforeTax + tax)/100
  document.querySelector('.shipping-cost').innerHTML = '$' + shippingCost/100
}