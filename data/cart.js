export const cart = []

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

export function removePopUpEffect(element) {
  return setTimeout(() => {
    element.classList.remove('opacity-1')
  },1500)
}