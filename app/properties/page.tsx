import { getProperties } from '@/lib/cosmic';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilter from '@/components/PropertyFilter';
import { Property } from '@/types';

export default async function PropertiesPage() {
  const properties = await getProperties();

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
        
        <PropertyFilter />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {properties.map((property: Property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        {properties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-secondary-600">
              No properties found. Please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}