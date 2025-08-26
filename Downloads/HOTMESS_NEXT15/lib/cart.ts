'use server'
import { cookies } from 'next/headers'
import { storefront } from './shopify'

const CART_COOKIE = 'shopify_cart_id'

const CART_CREATE = `#graphql
mutation cartCreate($lines: [CartLineInput!]) {
  cartCreate(input: { lines: $lines }) {
    cart { id checkoutUrl }
    userErrors { field message }
  }
}`

const CART_LINES_ADD = `#graphql
mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart { id checkoutUrl }
    userErrors { field message }
  }
}`

export async function buyNow(variantId: string, quantity: number = 1): Promise<string>{
  const cookieStore = cookies()
  const existing = cookieStore.get(CART_COOKIE)?.value
  if(existing){
    const data = await storefront<any>(CART_LINES_ADD, { cartId: existing, lines: [{ quantity, merchandiseId: variantId }] })
    const url = data?.cartLinesAdd?.cart?.checkoutUrl
    if(url) return url
  }
  const data = await storefront<any>(CART_CREATE, { lines: [{ quantity, merchandiseId: variantId }] })
  const cart = data?.cartCreate?.cart
  if(!cart?.id) throw new Error('Failed to create cart')
  cookieStore.set(CART_COOKIE, cart.id, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 60*60*24*7 })
  return cart.checkoutUrl
}
