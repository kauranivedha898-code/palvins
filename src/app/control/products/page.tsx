'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Product } from '@/types'
import Button from '@/components/Button'
import toast from 'react-hot-toast'

export default function ProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    selling_price: '',
    tags: '',
    image_url: '',
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/control/login')
        return
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        selling_price: parseFloat(formData.selling_price),
        tags: formData.tags.split(',').map(t => t.trim()),
        image_url: formData.image_url,
        is_published: true,
      }

      if (editingId) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingId)

        if (error) throw error
        toast.success('Product updated!')
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData])

        if (error) throw error
        toast.success('Product created!')
      }

      setFormData({
        name: '',
        description: '',
        category: '',
        selling_price: '',
        tags: '',
        image_url: '',
      })
      setEditingId(null)
      setShowForm(false)
      fetchProducts()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      selling_price: product.selling_price.toString(),
      tags: product.tags?.join(', ') || '',
      image_url: product.image_url || '',
    })
    setEditingId(product.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return

    try {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (error) throw error
      toast.success('Product deleted!')
      fetchProducts()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handlePublish = async (id: string, isPublished: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_published: !isPublished })
        .eq('id', id)

      if (error) throw error
      toast.success(isPublished ? 'Product unpublished!' : 'Product published!')
      fetchProducts()
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
            <h1 className="heading-h3 text-xl">Product Management</h1>
            <p className="text-sm text-cocoa/60">Create and manage products for sale</p>
          </div>
          <Button variant="primary" size="md" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ New Product'}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form */}
        {showForm && (
          <div className="card p-8 mb-8">
            <h2 className="heading-h2 text-lg mb-6">{editingId ? 'Edit Product' : 'Create New Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Product name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
              </div>

              <textarea
                placeholder="Product description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                rows={4}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="number"
                  placeholder="Selling price (₦)"
                  value={formData.selling_price}
                  onChange={(e) => setFormData({ ...formData, selling_price: e.target.value })}
                  required
                  className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
              </div>

              <input
                type="text"
                placeholder="Tags (comma-separated)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />

              <div className="flex gap-4">
                <Button variant="primary" size="md">
                  {editingId ? 'Update' : 'Create'} Product
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="card overflow-hidden">
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="heading-h3 text-lg">{product.name}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        product.is_published
                          ? 'bg-sage-100 text-sage-700'
                          : 'bg-beige-100 text-beige-700'
                      }`}
                    >
                      {product.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>

                  <p className="text-sm text-cocoa/60 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mb-4 pb-4 border-b border-sage-100">
                    <p className="text-2xl font-bold text-sage-500">
                      ₦{product.selling_price.toFixed(0)}
                    </p>
                  </div>

                  {product.tags && product.tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {product.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-beige-100 text-cocoa/70 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 text-sage-500 hover:text-sage-600 font-semibold text-sm py-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handlePublish(product.id, product.is_published)}
                      className="flex-1 text-terracotta-500 hover:text-terracotta-600 font-semibold text-sm py-2"
                    >
                      {product.is_published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 text-red-500 hover:text-red-600 font-semibold text-sm py-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-cocoa/60">
            <p>No products yet. Create your first product!</p>
          </div>
        )}
      </div>
    </div>
  )
}
