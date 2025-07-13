'use client'
import { useState } from 'react'

interface PropertyGalleryProps {
  images: Array<{
    url: string
    imgix_url: string
  }>
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const gallery = images || []

  if (!gallery || gallery.length === 0) {
    return null
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