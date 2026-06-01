'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Ingredient } from '@/types'
import Button from '@/components/Button'
import toast from 'react-hot-toast'

export default function IngredientsPage() {
  const router = useRouter()
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    unit: '',
    pack_size: '',
    cost_ngn: '',
    cost_per_unit: '',
    notes: '',
  })

  useEffect(() => {
    fetchIngredients()
  }, [])

  const fetchIngredients = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/control/login')
        return
      }

      const { data, error } = await supabase
        .from('ingredients')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setIngredients(data || [])
    } catch (error) {
      console.error('Error fetching ingredients:', error)
      toast.error('Failed to load ingredients')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const ingredientData = {
        name: formData.name,
        category: formData.category,
        unit: formData.unit,
        pack_size: parseFloat(formData.pack_size),
        cost_ngn: parseFloat(formData.cost_ngn),
        cost_per_unit: parseFloat(formData.cost_per_unit),
        notes: formData.notes,
      }

      if (editingId) {
        const { error } = await supabase
          .from('ingredients')
          .update(ingredientData)
          .eq('id', editingId)

        if (error) throw error
        toast.success('Ingredient updated!')
      } else {
        const { error } = await supabase
          .from('ingredients')
          .insert([ingredientData])

        if (error) throw error
        toast.success('Ingredient added!')
      }

      setFormData({ name: '', category: '', unit: '', pack_size: '', cost_ngn: '', cost_per_unit: '', notes: '' })
      setEditingId(null)
      setShowForm(false)
      fetchIngredients()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleEdit = (ingredient: Ingredient) => {
    setFormData({
      name: ingredient.name,
      category: ingredient.category,
      unit: ingredient.unit,
      pack_size: ingredient.pack_size.toString(),
      cost_ngn: ingredient.cost_ngn.toString(),
      cost_per_unit: ingredient.cost_per_unit.toString(),
      notes: ingredient.notes || '',
    })
    setEditingId(ingredient.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return

    try {
      const { error } = await supabase.from('ingredients').delete().eq('id', id)
      if (error) throw error
      toast.success('Ingredient deleted!')
      fetchIngredients()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white border-b border-sage-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="heading-h3 text-xl">Ingredients Management</h1>
            <p className="text-sm text-cocoa/60">Manage ingredient database and costing</p>
          </div>
          <Button variant="primary" size="md" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ Add Ingredient'}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form */}
        {showForm && (
          <div className="card p-8 mb-8">
            <h2 className="heading-h2 text-lg mb-6">
              {editingId ? 'Edit Ingredient' : 'Add New Ingredient'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Ingredient name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
              <input
                type="text"
                placeholder="Category (e.g., Flour, Sugar)"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
              <input
                type="text"
                placeholder="Unit (kg, g, ml)"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                required
                className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
              <input
                type="number"
                placeholder="Pack size"
                value={formData.pack_size}
                onChange={(e) => setFormData({ ...formData, pack_size: e.target.value })}
                required
                className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
              <input
                type="number"
                placeholder="Cost NGN"
                value={formData.cost_ngn}
                onChange={(e) => setFormData({ ...formData, cost_ngn: e.target.value })}
                required
                className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
              <input
                type="number"
                placeholder="Cost per unit"
                value={formData.cost_per_unit}
                onChange={(e) => setFormData({ ...formData, cost_per_unit: e.target.value })}
                required
                className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
              <textarea
                placeholder="Notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="md:col-span-2 px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                rows={3}
              />
              <div className="md:col-span-2 flex gap-4">
                <Button variant="primary" size="md">
                  {editingId ? 'Update' : 'Add'} Ingredient
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : ingredients.length > 0 ? (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-sage-50 border-b border-sage-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-cocoa">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-cocoa">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-cocoa">Unit</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-cocoa">Cost NGN</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-cocoa">Cost/Unit</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-cocoa">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage-100">
                  {ingredients.map((ingredient) => (
                    <tr key={ingredient.id} className="hover:bg-cream transition">
                      <td className="px-6 py-4 text-sm">{ingredient.name}</td>
                      <td className="px-6 py-4 text-sm">{ingredient.category}</td>
                      <td className="px-6 py-4 text-sm">{ingredient.unit}</td>
                      <td className="px-6 py-4 text-sm font-semibold">₦{ingredient.cost_ngn.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm font-semibold">₦{ingredient.cost_per_unit.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm flex gap-2">
                        <button
                          onClick={() => handleEdit(ingredient)}
                          className="text-sage-500 hover:text-sage-600 font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(ingredient.id)}
                          className="text-terracotta-500 hover:text-terracotta-600 font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-cocoa/60">
            <p>No ingredients yet. Create your first ingredient!</p>
          </div>
        )}
      </div>
    </div>
  )
}
