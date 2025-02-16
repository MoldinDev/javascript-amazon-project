export const cart = {
  "3ebe75dc-64d2-4137-8860-1f5a963e534b": 5,
  "8c9c52b5-5a19-4bcb-a5d1-158a74287c53": 2,
  "3fdfe8d6-9a15-4979-b459-585b0d0545b9": 1
}

export function addToCart(productId, option, index) {
  if (cart[productId]){
    cart[productId] += Number(option[index].value)
  } else {
    cart[productId] = Number(option[index].value)
  }
}

export function totalCart(cartItems) {

  let cartCount = 0
  let cart = cartItems
  for (let key in cart) {
    cartCount += cart[key]
  }
  return Number(cartCount)

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

export function checkoutCalculate(totalItems, totalBeforeTax, tax, subTotalCost) {
  document.querySelector('.checkout-header-middle-section').innerHTML = `Items (${totalItems})`
  document.querySelector('.total-before-tax').innerHTML = '$' + totalBeforeTax/100
  document.querySelector('.estimated-tax').innerHTML = '$' + Math.round(tax)/100
  document.querySelector('.total-items').innerHTML = `Items (${totalItems})`
  document.querySelector('.sub-total-cost').innerHTML = '$' + subTotalCost/100
  document.querySelector('.total-cost').innerHTML = '$' + Math.round(totalBeforeTax + tax)/100
}