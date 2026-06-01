'use client'

import { useCart } from '@/store/cart'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/Button'

export default function CartPage() {
  const items = useCart((state) => state.items)
  const removeItem = useCart((state) => state.removeItem)
  const updateQuantity = useCart((state) => state.updateQuantity)
  const getTotalPrice = useCart((state) => state.getTotalPrice())
  const clearCart = useCart((state) => state.clearCart)

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-20">
        <div className="container-section text-center">
          <h1 className="heading-h1 mb-4">Your Cart is Empty</h1>
          <p className="text-body mb-8">Add some delicious products to get started!</p>
          <Link href="/shop">
            <Button variant="primary" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 container-section">
      <h1 className="heading-h1 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card divide-y">
            {items.map((item) => (
              <div key={item.id} className="p-6 flex gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{item.product.name}</h3>
                  <p className="text-sm text-cocoa/60 mb-4">
                    {formatPrice(item.price)}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                      className="px-3 py-1 border border-sage-200 rounded hover:bg-sage-50"
                    >
                      −
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                      className="px-3 py-1 border border-sage-200 rounded hover:bg-sage-50"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.product_id)}
                      className="ml-auto text-terracotta-500 hover:text-terracotta-600 text-sm font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6 h-fit">
          <h2 className="heading-h3 text-lg mb-4">Order Summary</h2>
          <div className="space-y-3 mb-6 pb-6 border-b border-sage-100">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">{formatPrice(getTotalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold">₦2,500</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="font-bold">Total</span>
              <span className="font-bold text-sage-500">
                {formatPrice(getTotalPrice + 2500)}
              </span>
            </div>
          </div>
          <Link href="/checkout">
            <Button variant="primary" size="lg" className="w-full mb-3">
              Proceed to Checkout
            </Button>
          </Link>
          <Button variant="outline" size="md" className="w-full">
            Continue Shopping
          </Button>
          <button
            onClick={() => clearCart()}
            className="w-full mt-3 text-sm text-terracotta-500 hover:text-terracotta-600 font-semibold"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  )
}
