'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Button from '@/components/Button'
import toast from 'react-hot-toast'

interface InventoryItem {
  id: string
  ingredient_id: string
  ingredient_name: string
  opening_stock: number
  purchases: number
  usage: number
  closing_stock: number
  reorder_level: number
}

export default function InventoryPage() {
  const router = useRouter()
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    opening_stock: '',
    purchases: '',
    usage: '',
    reorder_level: '',
  })

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/control/login')
        return
      }

      const { data, error } = await supabase
        .from('inventory')
        .select(`
          *,
          ingredients:ingredient_id(name)
        `)
        .order('ingredient_id', { ascending: true })

      if (error) throw error

      const formattedData = (data || []).map((item: any) => ({
        id: item.id,
        ingredient_id: item.ingredient_id,
        ingredient_name: item.ingredients?.name || 'Unknown',
        opening_stock: item.opening_stock,
        purchases: item.purchases,
        usage: item.usage,
        closing_stock: item.closing_stock,
        reorder_level: item.reorder_level,
      }))

      setInventory(formattedData)
    } catch (error) {
      console.error('Error fetching inventory:', error)
      toast.error('Failed to load inventory')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (e: React.FormEvent, itemId: string) => {
    e.preventDefault()

    try {
      const opening = parseFloat(formData.opening_stock) || 0
      const purchases = parseFloat(formData.purchases) || 0
      const usage = parseFloat(formData.usage) || 0
      const closing = opening + purchases - usage

      const { error } = await supabase
        .from('inventory')
        .update({
          opening_stock: opening,
          purchases: purchases,
          usage: usage,
          closing_stock: closing,
          reorder_level: parseFloat(formData.reorder_level) || 0,
        })
        .eq('id', itemId)

      if (error) throw error
      toast.success('Inventory updated!')
      setEditingId(null)
      fetchInventory()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleEdit = (item: InventoryItem) => {
    setFormData({
      opening_stock: item.opening_stock.toString(),
      purchases: item.purchases.toString(),
      usage: item.usage.toString(),
      reorder_level: item.reorder_level.toString(),
    })
    setEditingId(item.id)
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white border-b border-sage-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="heading-h3 text-xl">Inventory Management</h1>
          <p className="text-sm text-cocoa/60">Track stock levels and reorder alerts</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts */}
        {inventory.some((item) => item.closing_stock <= item.reorder_level) && (
          <div className="card p-4 mb-8 bg-yellow-50 border border-yellow-200">
            <p className="text-sm font-semibold text-yellow-700">
              ⚠️ {inventory.filter((i) => i.closing_stock <= i.reorder_level).length} items need reordering
            </p>
          </div>
        )}

        {/* Inventory Table */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : inventory.length > 0 ? (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-sage-50 border-b border-sage-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-cocoa">Ingredient</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-cocoa">Opening</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-cocoa">Purchases</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-cocoa">Usage</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-cocoa">Closing</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-cocoa">Reorder Level</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-cocoa">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-cocoa">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage-100">
                  {inventory.map((item) => (
                    <tr key={item.id} className="hover:bg-cream transition">
                      <td className="px-6 py-4 text-sm font-semibold">{item.ingredient_name}</td>
                      <td className="px-6 py-4 text-sm">{item.opening_stock}</td>
                      <td className="px-6 py-4 text-sm">{item.purchases}</td>
                      <td className="px-6 py-4 text-sm">{item.usage}</td>
                      <td className="px-6 py-4 text-sm font-semibold">{item.closing_stock}</td>
                      <td className="px-6 py-4 text-sm">{item.reorder_level}</td>
                      <td className="px-6 py-4 text-sm">
                        {item.closing_stock <= item.reorder_level ? (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">
                            Low Stock
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-sage-100 text-sage-700 rounded text-xs font-semibold">
                            OK
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {editingId === item.id ? (
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-cocoa/60 hover:text-cocoa font-semibold"
                          >
                            Cancel
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-sage-500 hover:text-sage-600 font-semibold"
                          >
                            Update
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-cocoa/60">
            <p>No inventory items yet</p>
          </div>
        )}

        {/* Edit Form */}
        {editingId && (
          <div className="card p-8 mt-8">
            <h2 className="heading-h2 text-lg mb-6">Update Inventory</h2>
            <form
              onSubmit={(e) => handleUpdate(e, editingId)}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <input
                type="number"
                placeholder="Opening stock"
                value={formData.opening_stock}
                onChange={(e) => setFormData({ ...formData, opening_stock: e.target.value })}
                className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
              <input
                type="number"
                placeholder="Purchases"
                value={formData.purchases}
                onChange={(e) => setFormData({ ...formData, purchases: e.target.value })}
                className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
              <input
                type="number"
                placeholder="Usage"
                value={formData.usage}
                onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
              <input
                type="number"
                placeholder="Reorder level"
                value={formData.reorder_level}
                onChange={(e) => setFormData({ ...formData, reorder_level: e.target.value })}
                className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
              <div className="md:col-span-2">
                <Button variant="primary" size="md">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
