'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Product } from '@/types'
import ProductCard from '@/components/ProductCard'
import Button from '@/components/Button'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_published', true)
          .limit(6)

        if (error) throw error
        setProducts(data || [])
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <div>
      <section className="py-20 md:py-32 bg-gradient-to-br from-cream via-beige-100 to-cream">
        <div className="container-section text-center">
          <h1 className="heading-h1 mb-4">Health Cakes & Conscious Eating</h1>
          <p className="text-body text-xl mb-8 max-w-2xl mx-auto">
            Wholesome cakes, healthy treats and guilt-free indulgence made with carefully selected ingredients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              Shop Now
            </Button>
            <Button variant="outline" size="lg">
              Explore Our Story
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 container-section">
        <h2 className="heading-h2 mb-12 text-center">Featured Products</h2>
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-cocoa/60">
            <p>No products available yet</p>
          </div>
        )}
      </section>

      <section className="py-20 bg-sage-50">
        <div className="container-section">
          <h2 className="heading-h2 mb-12 text-center">Why Choose Palvins?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🌿', title: 'Natural Ingredients', desc: 'Only the finest natural, wholesome ingredients' },
              { icon: '❤️', title: 'Health First', desc: 'Designed for conscious eating and wellness' },
              { icon: '✨', title: 'Premium Quality', desc: 'Every product crafted with care and expertise' },
            ].map((feature, idx) => (
              <div key={idx} className="text-center card p-8">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="heading-h3 text-lg mb-2">{feature.title}</h3>
                <p className="text-body text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
