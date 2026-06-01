'use client'

import { useState } from 'react'
import Button from '@/components/Button'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('Message sent successfully!')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      toast.error('Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <section className="py-12 md:py-16 bg-gradient-to-br from-cream via-beige-100 to-cream">
        <div className="container-section text-center">
          <h1 className="heading-h1 mb-4">Get in Touch</h1>
          <p className="text-body text-lg">We would love to hear from you</p>
        </div>
      </section>

      <section className="py-20 container-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="heading-h2 mb-8">Contact Information</h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-lg mb-2">📧 Email</h3>
                <a
                  href="mailto:pallavikaurani9@gmail.com"
                  className="text-sage-500 hover:text-sage-600 font-semibold"
                >
                  pallavikaurani9@gmail.com
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">📱 Phone</h3>
                <a
                  href="tel:+2348035557284"
                  className="text-sage-500 hover:text-sage-600 font-semibold"
                >
                  +234 803 555 7284
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">💬 WhatsApp</h3>
                <a
                  href="https://wa.me/2348035557284"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sage-500 hover:text-sage-600 font-semibold"
                >
                  Chat with us on WhatsApp
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">⏰ Hours</h3>
                <p className="text-body">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="heading-h2 mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="card p-8">
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                  placeholder="Your name"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                  placeholder="your@email.com"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                  placeholder="Subject"
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 resize-none"
                  placeholder="Your message..."
                />
              </div>

              <Button variant="primary" size="lg" isLoading={loading} className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
