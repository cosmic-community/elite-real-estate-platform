'use client'
import { useState } from 'react'
import { CosmicFile } from '@/types'

interface PropertyGalleryProps {
  images: CosmicFile[]
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const gallery = images || []

  if (!gallery || gallery.length === 0) {
    return (
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p>No images available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={`${gallery[selectedImage]?.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
          alt={`Property - Image ${selectedImage + 1}`}
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
                alt={`Property - Thumbnail ${index + 1}`}
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