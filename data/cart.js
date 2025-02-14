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

export function removePopUpEffect(element) {
  return setTimeout(() => {
    element.classList.remove('opacity-1')
  },1500)
}