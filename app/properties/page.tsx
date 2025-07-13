'use client'
import { useEffect, useState } from 'react'
import { getProperties } from '@/lib/cosmic'
import PropertyCard from '@/components/PropertyCard'
import PropertyFilter, { PropertyFilters } from '@/components/PropertyFilter'
import { Property } from '@/types'

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties()
        setProperties(data)
        setFilteredProperties(data)
      } catch (error) {
        console.error('Error fetching properties:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  const handleFilterChange = (filters: PropertyFilters) => {
    let filtered = [...properties]

    // Filter by property type
    if (filters.propertyType) {
      filtered = filtered.filter(property => 
        property.metadata.property_type.key === filters.propertyType
      )
    }

    // Filter by price range
    if (filters.minPrice > 0) {
      filtered = filtered.filter(property => 
        property.metadata.price >= filters.minPrice
      )
    }

    if (filters.maxPrice > 0) {
      filtered = filtered.filter(property => 
        property.metadata.price <= filters.maxPrice
      )
    }

    // Filter by bedrooms
    if (filters.bedrooms > 0) {
      filtered = filtered.filter(property => 
        property.metadata.bedrooms >= filters.bedrooms
      )
    }

    // Filter by bathrooms
    if (filters.bathrooms > 0) {
      filtered = filtered.filter(property => 
        property.metadata.bathrooms >= filters.bathrooms
      )
    }

    // Filter by status
    if (filters.status) {
      filtered = filtered.filter(property => 
        property.metadata.property_status.key === filters.status
      )
    }

    setFilteredProperties(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-secondary-600">Loading properties...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-4">
            Property Listings
          </h1>
          <p className="text-lg text-secondary-600">
            Discover your dream property from our exclusive collection
          </p>
        </div>
        
        <PropertyFilter onFilterChange={handleFilterChange} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredProperties.map((property: Property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        {filteredProperties.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-lg text-secondary-600">
              No properties found matching your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}