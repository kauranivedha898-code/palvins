'use client'

import { useState } from 'react'
import { useCart } from '@/store/cart'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/Button'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const items = useCart((state) => state.items)
  const getTotalPrice = useCart((state) => state.getTotalPrice())
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'flutterwave'>('paystack')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
  })

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-20">
        <div className="container-section text-center">
          <h1 className="heading-h1 mb-4">Checkout</h1>
          <p className="text-body mb-8 text-lg">Your cart is empty</p>
          <Link href="/shop">
            <Button variant="primary" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      toast.success('Processing payment...')
    } catch (error) {
      toast.error('Payment processing failed')
    } finally {
      setLoading(false)
    }
  }

  const subtotal = getTotalPrice
  const shipping = 2500
  const total = subtotal + shipping

  return (
    <div className="py-12 container-section">
      <h1 className="heading-h1 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="card p-8 space-y-8">
            <div>
              <h2 className="heading-h3 text-lg mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="md:col-span-2 px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="md:col-span-2 px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="md:col-span-2 px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
              </div>
            </div>

            <div>
              <h2 className="heading-h3 text-lg mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border border-sage-200 rounded-lg cursor-pointer hover:bg-sage-50">
                  <input
                    type="radio"
                    name="payment"
                    value="paystack"
                    checked={paymentMethod === 'paystack'}
                    onChange={() => setPaymentMethod('paystack')}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-semibold">Paystack</span>
                </label>
                <label className="flex items-center p-4 border border-sage-200 rounded-lg cursor-pointer hover:bg-sage-50">
                  <input
                    type="radio"
                    name="payment"
                    value="flutterwave"
                    checked={paymentMethod === 'flutterwave'}
                    onChange={() => setPaymentMethod('flutterwave')}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-semibold">Flutterwave</span>
                </label>
              </div>
            </div>

            <Button variant="primary" size="lg" isLoading={loading} className="w-full">
              Pay {formatPrice(total)}
            </Button>
          </form>
        </div>

        <div>
          <div className="card p-6 sticky top-20">
            <h2 className="heading-h3 text-lg mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-sage-100 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-cocoa/60">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-cocoa/60">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cocoa/60">Shipping</span>
                <span className="font-semibold">{formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-lg border-t border-sage-100 pt-2">
                <span className="font-bold">Total</span>
                <span className="font-bold text-sage-500">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="p-4 bg-sage-50 rounded-lg text-sm text-cocoa/70">
              💚 By ordering, you agree to our terms and conditions.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
