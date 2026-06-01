'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Recipe } from '@/types'
import Button from '@/components/Button'
import toast from 'react-hot-toast'

export default function RecipesPage() {
  const router = useRouter()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    packaging_cost: '',
    labour_cost: '',
    electricity_cost: '',
    gas_cost: '',
    delivery_cost: '',
    suggested_selling_price: '',
  })

  useEffect(() => {
    fetchRecipes()
  }, [])

  const fetchRecipes = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/control/login')
        return
      }

      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setRecipes(data || [])
    } catch (error) {
      console.error('Error fetching recipes:', error)
      toast.error('Failed to load recipes')
    } finally {
      setLoading(false)
    }
  }

  const calculateCosts = () => {
    const costs = {
      packaging: parseFloat(formData.packaging_cost) || 0,
      labour: parseFloat(formData.labour_cost) || 0,
      electricity: parseFloat(formData.electricity_cost) || 0,
      gas: parseFloat(formData.gas_cost) || 0,
      delivery: parseFloat(formData.delivery_cost) || 0,
    }

    const totalCost = Object.values(costs).reduce((a, b) => a + b, 0)
    const sellingPrice = parseFloat(formData.suggested_selling_price) || 0
    const profitMargin = sellingPrice > 0 ? ((sellingPrice - totalCost) / sellingPrice) * 100 : 0

    return { totalCost, profitMargin }
  }

  const { totalCost, profitMargin } = calculateCosts()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const recipeData = {
        name: formData.name,
        description: formData.description,
        packaging_cost: parseFloat(formData.packaging_cost) || 0,
        labour_cost: parseFloat(formData.labour_cost) || 0,
        electricity_cost: parseFloat(formData.electricity_cost) || 0,
        gas_cost: parseFloat(formData.gas_cost) || 0,
        delivery_cost: parseFloat(formData.delivery_cost) || 0,
        total_cost: totalCost,
        suggested_selling_price: parseFloat(formData.suggested_selling_price) || 0,
        profit_margin: profitMargin,
        created_by: user.id,
      }

      if (editingId) {
        const { error } = await supabase
          .from('recipes')
          .update(recipeData)
          .eq('id', editingId)

        if (error) throw error
        toast.success('Recipe updated!')
      } else {
        const { error } = await supabase
          .from('recipes')
          .insert([recipeData])

        if (error) throw error
        toast.success('Recipe created!')
      }

      setFormData({
        name: '',
        description: '',
        packaging_cost: '',
        labour_cost: '',
        electricity_cost: '',
        gas_cost: '',
        delivery_cost: '',
        suggested_selling_price: '',
      })
      setEditingId(null)
      setShowForm(false)
      fetchRecipes()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleEdit = (recipe: Recipe) => {
    setFormData({
      name: recipe.name,
      description: recipe.description || '',
      packaging_cost: recipe.packaging_cost.toString(),
      labour_cost: recipe.labour_cost.toString(),
      electricity_cost: recipe.electricity_cost.toString(),
      gas_cost: recipe.gas_cost.toString(),
      delivery_cost: recipe.delivery_cost.toString(),
      suggested_selling_price: recipe.suggested_selling_price.toString(),
    })
    setEditingId(recipe.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this recipe?')) return

    try {
      const { error } = await supabase.from('recipes').delete().eq('id', id)
      if (error) throw error
      toast.success('Recipe deleted!')
      fetchRecipes()
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
            <h1 className="heading-h3 text-xl">Recipe Management</h1>
            <p className="text-sm text-cocoa/60">Create recipes with automatic cost calculations</p>
          </div>
          <Button variant="primary" size="md" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ New Recipe'}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form */}
        {showForm && (
          <div className="card p-8 mb-8">
            <h2 className="heading-h2 text-lg mb-6">{editingId ? 'Edit Recipe' : 'Create New Recipe'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Recipe name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
              </div>

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                rows={3}
              />

              <div>
                <h3 className="font-semibold mb-4 text-cocoa">Cost Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="number"
                    placeholder="Packaging cost"
                    value={formData.packaging_cost}
                    onChange={(e) => setFormData({ ...formData, packaging_cost: e.target.value })}
                    className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                  />
                  <input
                    type="number"
                    placeholder="Labour cost"
                    value={formData.labour_cost}
                    onChange={(e) => setFormData({ ...formData, labour_cost: e.target.value })}
                    className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                  />
                  <input
                    type="number"
                    placeholder="Electricity cost"
                    value={formData.electricity_cost}
                    onChange={(e) => setFormData({ ...formData, electricity_cost: e.target.value })}
                    className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                  />
                  <input
                    type="number"
                    placeholder="Gas cost"
                    value={formData.gas_cost}
                    onChange={(e) => setFormData({ ...formData, gas_cost: e.target.value })}
                    className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                  />
                  <input
                    type="number"
                    placeholder="Delivery cost"
                    value={formData.delivery_cost}
                    onChange={(e) => setFormData({ ...formData, delivery_cost: e.target.value })}
                    className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-sage-50 rounded-lg">
                <div>
                  <p className="text-sm text-cocoa/60">Total Cost</p>
                  <p className="text-xl font-bold text-sage-500">₦{totalCost.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-cocoa/60">Profit Margin</p>
                  <p className="text-xl font-bold text-terracotta-500">{profitMargin.toFixed(1)}%</p>
                </div>
                <input
                  type="number"
                  placeholder="Suggested selling price"
                  value={formData.suggested_selling_price}
                  onChange={(e) => setFormData({ ...formData, suggested_selling_price: e.target.value })}
                  className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
              </div>

              <div className="flex gap-4">
                <Button variant="primary" size="md">
                  {editingId ? 'Update' : 'Create'} Recipe
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Recipes Grid */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="card p-6">
                <h3 className="heading-h3 text-lg mb-2">{recipe.name}</h3>
                <p className="text-sm text-cocoa/60 mb-4">{recipe.description}</p>

                <div className="space-y-2 mb-6 pb-6 border-b border-sage-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-cocoa/60">Total Cost:</span>
                    <span className="font-semibold">₦{recipe.total_cost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cocoa/60">Selling Price:</span>
                    <span className="font-semibold">₦{recipe.suggested_selling_price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cocoa/60">Profit Margin:</span>
                    <span className="font-semibold text-terracotta-500">{recipe.profit_margin.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(recipe)}
                    className="flex-1 text-sage-500 hover:text-sage-600 font-semibold text-sm py-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(recipe.id)}
                    className="flex-1 text-terracotta-500 hover:text-terracotta-600 font-semibold text-sm py-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-cocoa/60">
            <p>No recipes yet. Create your first recipe!</p>
          </div>
        )}
      </div>
    </div>
  )
}
