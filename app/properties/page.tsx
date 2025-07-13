import { getProperties } from '@/lib/cosmic';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilter from '@/components/PropertyFilter';
import { Property } from '@/types';

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  
  // Get all properties from server
  const properties = await getProperties();
  
  // Apply server-side filtering based on search params
  let filteredProperties = properties;
  
  if (params.type && typeof params.type === 'string') {
    filteredProperties = filteredProperties.filter(property => 
      property.metadata.property_type?.key === params.type
    );
  }
  
  if (params.minPrice && typeof params.minPrice === 'string') {
    const minPrice = Number(params.minPrice);
    if (!isNaN(minPrice)) {
      filteredProperties = filteredProperties.filter(property => 
        property.metadata.price >= minPrice
      );
    }
  }
  
  if (params.maxPrice && typeof params.maxPrice === 'string') {
    const maxPrice = Number(params.maxPrice);
    if (!isNaN(maxPrice)) {
      filteredProperties = filteredProperties.filter(property => 
        property.metadata.price <= maxPrice
      );
    }
  }
  
  if (params.minBedrooms && typeof params.minBedrooms === 'string') {
    const minBedrooms = Number(params.minBedrooms);
    if (!isNaN(minBedrooms)) {
      filteredProperties = filteredProperties.filter(property => 
        property.metadata.bedrooms >= minBedrooms
      );
    }
  }
  
  if (params.minBathrooms && typeof params.minBathrooms === 'string') {
    const minBathrooms = Number(params.minBathrooms);
    if (!isNaN(minBathrooms)) {
      filteredProperties = filteredProperties.filter(property => 
        property.metadata.bathrooms >= minBathrooms
      );
    }
  }
  
  if (params.status && typeof params.status === 'string') {
    filteredProperties = filteredProperties.filter(property => 
      property.metadata.property_status?.key === params.status
    );
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
        
        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <PropertyFilter />
            </div>
          </div>
          
          {/* Right Column - Properties */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
}