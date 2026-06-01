'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { DashboardKPI } from '@/types'
import Button from '@/components/Button'
import Link from 'next/link'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [kpis, setKpis] = useState<DashboardKPI>({
    totalSales: 0,
    ordersPending: 0,
    ordersDelivered: 0,
    topProducts: [],
    inventoryAlerts: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get current user
        const { data: { user: authUser } } = await supabase.auth.getUser()
        if (!authUser) {
          router.push('/control/login')
          return
        }
        setUser(authUser)

        // Fetch total sales
        const { data: orders } = await supabase
          .from('orders')
          .select('total_amount, delivery_status')

        if (orders) {
          const total = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0)
          const pending = orders.filter(o => o.delivery_status === 'pending').length
          const delivered = orders.filter(o => o.delivery_status === 'delivered').length

          setKpis(prev => ({
            ...prev,
            totalSales: total,
            ordersPending: pending,
            ordersDelivered: delivered,
          }))
        }
      } catch (error) {
        console.error('Error fetching dashboard:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/control/login')
  }

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white border-b border-sage-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <h1 className="font-serif text-2xl font-bold text-sage-500">Palvins Control</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-cocoa/60">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome */}
        <div className="mb-12">
          <h2 className="heading-h2 mb-2">Dashboard</h2>
          <p className="text-body">Welcome to Palvins Management Portal</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="card p-6">
            <div className="text-sm text-cocoa/60 mb-2">Total Sales</div>
            <div className="text-3xl font-bold text-sage-500 mb-2">
              ₦{(kpis.totalSales / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-cocoa/60">All time revenue</div>
          </div>

          <div className="card p-6">
            <div className="text-sm text-cocoa/60 mb-2">Orders Pending</div>
            <div className="text-3xl font-bold text-terracotta-500 mb-2">
              {kpis.ordersPending}
            </div>
            <div className="text-xs text-cocoa/60">Awaiting delivery</div>
          </div>

          <div className="card p-6">
            <div className="text-sm text-cocoa/60 mb-2">Orders Delivered</div>
            <div className="text-3xl font-bold text-sage-600 mb-2">
              {kpis.ordersDelivered}
            </div>
            <div className="text-xs text-cocoa/60">Completed orders</div>
          </div>

          <div className="card p-6">
            <div className="text-sm text-cocoa/60 mb-2">Products</div>
            <div className="text-3xl font-bold text-beige-600 mb-2">
              {kpis.topProducts.length}
            </div>
            <div className="text-xs text-cocoa/60">Published items</div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Ingredients */}
          <Link href="/control/ingredients">
            <div className="card p-8 cursor-pointer hover:shadow-hover transition">
              <div className="text-4xl mb-4">🥘</div>
              <h3 className="heading-h3 text-lg mb-2">Ingredients</h3>
              <p className="text-body text-sm mb-4">Manage ingredient database and costing</p>
              <Button variant="outline" size="sm">
                Open
              </Button>
            </div>
          </Link>

          {/* Recipes */}
          <Link href="/control/recipes">
            <div className="card p-8 cursor-pointer hover:shadow-hover transition">
              <div className="text-4xl mb-4">📖</div>
              <h3 className="heading-h3 text-lg mb-2">Recipes</h3>
              <p className="text-body text-sm mb-4">Create and manage recipes with costing</p>
              <Button variant="outline" size="sm">
                Open
              </Button>
            </div>
          </Link>

          {/* Products */}
          <Link href="/control/products">
            <div className="card p-8 cursor-pointer hover:shadow-hover transition">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="heading-h3 text-lg mb-2">Products</h3>
              <p className="text-body text-sm mb-4">Manage and publish products</p>
              <Button variant="outline" size="sm">
                Open
              </Button>
            </div>
          </Link>

          {/* Inventory */}
          <Link href="/control/inventory">
            <div className="card p-8 cursor-pointer hover:shadow-hover transition">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="heading-h3 text-lg mb-2">Inventory</h3>
              <p className="text-body text-sm mb-4">Track stock levels and reorder</p>
              <Button variant="outline" size="sm">
                Open
              </Button>
            </div>
          </Link>

          {/* Orders */}
          <Link href="/control/orders">
            <div className="card p-8 cursor-pointer hover:shadow-hover transition">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="heading-h3 text-lg mb-2">Orders</h3>
              <p className="text-body text-sm mb-4">Process and track customer orders</p>
              <Button variant="outline" size="sm">
                Open
              </Button>
            </div>
          </Link>

          {/* Settings */}
          <Link href="/control/settings">
            <div className="card p-8 cursor-pointer hover:shadow-hover transition">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="heading-h3 text-lg mb-2">Settings</h3>
              <p className="text-body text-sm mb-4">Configure system and exchange rates</p>
              <Button variant="outline" size="sm">
                Open
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
