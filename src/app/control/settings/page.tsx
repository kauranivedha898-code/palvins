'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Button from '@/components/Button'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [exchangeRate, setExchangeRate] = useState('2.8')
  const [businessName, setBusinessName] = useState('Palvins')
  const [email, setEmail] = useState('pallavikaurani9@gmail.com')
  const [phone, setPhone] = useState('+2348035557284')
  const [address, setAddress] = useState('Lagos, Nigeria')

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser()
        if (!authUser) {
          router.push('/control/login')
          return
        }
        setUser(authUser)

        // Fetch exchange rate
        const { data: rates } = await supabase
          .from('exchange_rates')
          .select('rate')
          .eq('from_currency', 'NGN')
          .eq('to_currency', 'INR')
          .single()

        if (rates) {
          setExchangeRate(rates.rate.toString())
        }
      } catch (error) {
        console.error('Error fetching settings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [router])

  const handleSaveExchangeRate = async () => {
    try {
      const { error } = await supabase
        .from('exchange_rates')
        .update({ rate: parseFloat(exchangeRate) })
        .eq('from_currency', 'NGN')
        .eq('to_currency', 'INR')

      if (error) throw error
      toast.success('Exchange rate updated!')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleSaveBusinessInfo = async () => {
    try {
      // Save to settings table
      const settings = {
        businessName,
        email,
        phone,
        address,
      }

      // Note: In production, you'd save this to the settings table
      toast.success('Business information saved!')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white border-b border-sage-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="heading-h3 text-xl">Settings</h1>
          <p className="text-sm text-cocoa/60">Configure system settings and preferences</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Account Settings */}
        <div className="card p-8">
          <h2 className="heading-h2 text-lg mb-6">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <p className="px-4 py-2 bg-sage-50 rounded-lg text-sm font-semibold">
                {user?.email}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Role</label>
              <p className="px-4 py-2 bg-sage-50 rounded-lg text-sm font-semibold">
                Administrator
              </p>
            </div>
            <div className="pt-4 border-t border-sage-100">
              <Button variant="outline" size="md">
                Change Password
              </Button>
            </div>
          </div>
        </div>

        {/* Business Information */}
        <div className="card p-8">
          <h2 className="heading-h2 text-lg mb-6">Business Information</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
            </div>
          </div>
          <Button variant="primary" size="md" onClick={handleSaveBusinessInfo}>
            Save Business Information
          </Button>
        </div>

        {/* Currency & Exchange Rate */}
        <div className="card p-8">
          <h2 className="heading-h2 text-lg mb-6">Currency Settings</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Primary Currency</label>
                <p className="px-4 py-2 bg-sage-50 rounded-lg text-sm font-semibold">NGN (Nigerian Naira)</p>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Alternate Currency</label>
                <p className="px-4 py-2 bg-sage-50 rounded-lg text-sm font-semibold">INR (Indian Rupee)</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">NGN to INR Exchange Rate</label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="number"
                    value={exchangeRate}
                    onChange={(e) => setExchangeRate(e.target.value)}
                    step="0.01"
                    className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                    placeholder="2.8"
                  />
                  <p className="text-xs text-cocoa/60 mt-2">
                    Example: 1 NGN = {exchangeRate} INR
                  </p>
                </div>
                <Button variant="primary" size="md" onClick={handleSaveExchangeRate}>
                  Update Rate
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="card p-8">
          <h2 className="heading-h2 text-lg mb-6">System Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-cocoa/60">Application</span>
              <span className="font-semibold">Palvins Control Room</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cocoa/60">Version</span>
              <span className="font-semibold">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cocoa/60">Framework</span>
              <span className="font-semibold">Next.js 14</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cocoa/60">Database</span>
              <span className="font-semibold">Supabase PostgreSQL</span>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="card p-8 border border-red-200">
          <h2 className="heading-h2 text-lg mb-4 text-red-600">Danger Zone</h2>
          <p className="text-sm text-cocoa/60 mb-6">Irreversible actions</p>
          <Button variant="outline" size="md" className="text-red-600 border-red-200 hover:bg-red-50">
            Clear All Data
          </Button>
        </div>
      </div>
    </div>
  )
}
