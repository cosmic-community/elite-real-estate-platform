import { getProperties } from '@/lib/cosmic'
import PropertyCard from '@/components/PropertyCard'
import PropertyFilter from '@/components/PropertyFilter'
import { Property } from '@/types'

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  
  // Get all properties from server
  const properties = await getProperties()
  
  // Apply server-side filtering based on search params
  let filteredProperties = properties
  
  if (params.type) {
    filteredProperties = filteredProperties.filter(property => 
      property.metadata.property_type?.key === params.type
    )
  }
  
  if (params.minPrice) {
    const minPrice = Number(params.minPrice)
    if (!isNaN(minPrice)) {
      filteredProperties = filteredProperties.filter(property => 
        property.metadata.price >= minPrice
      )
    }
  }
  
  if (params.maxPrice) {
    const maxPrice = Number(params.maxPrice)
    if (!isNaN(maxPrice)) {
      filteredProperties = filteredProperties.filter(property => 
        property.metadata.price <= maxPrice
      )
    }
  }
  
  if (params.minBedrooms) {
    const minBedrooms = Number(params.minBedrooms)
    if (!isNaN(minBedrooms)) {
      filteredProperties = filteredProperties.filter(property => 
        property.metadata.bedrooms >= minBedrooms
      )
    }
  }
  
  if (params.minBathrooms) {
    const minBathrooms = Number(params.minBathrooms)
    if (!isNaN(minBathrooms)) {
      filteredProperties = filteredProperties.filter(property => 
        property.metadata.bathrooms >= minBathrooms
      )
    }
  }
  
  if (params.status) {
    filteredProperties = filteredProperties.filter(property => 
      property.metadata.property_status?.key === params.status
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Property Listings
          </h1>
          <p className="text-lg text-gray-600">
            Discover your dream property from our exclusive collection
          </p>
        </div>
        
        <div className="mb-8">
          <PropertyFilter />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property: Property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              No properties found matching your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}