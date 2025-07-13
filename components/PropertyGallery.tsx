'use client'
import { useState } from 'react'
import { Property } from '@/types'

interface PropertyGalleryProps {
  property: Property
}

export default function PropertyGallery({ property }: PropertyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const gallery = property.metadata.gallery || []

  if (!gallery || gallery.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={`${gallery[selectedImage]?.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
          alt={`${property.title} - Image ${selectedImage + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Gallery */}
      {gallery.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto">
          {gallery.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                selectedImage === index ? 'border-blue-500' : 'border-gray-200'
              }`}
            >
              <img
                src={`${image.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={`${property.title} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      <div className="text-center text-sm text-gray-600">
        {selectedImage + 1} of {gallery.length}
      </div>
    </div>
  )
}