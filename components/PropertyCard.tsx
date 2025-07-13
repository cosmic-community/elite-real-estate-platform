import Link from 'next/link';
import { PropertyCardProps } from '@/types';

export default function PropertyCard({ property, className = '' }: PropertyCardProps) {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const mainImage = property.metadata.gallery?.[0];
  const propertyType = property.metadata.property_type?.value || 'Property';
  const propertyStatus = property.metadata.property_status?.value || 'Available';
  const bedrooms = property.metadata.bedrooms || 0;
  const bathrooms = property.metadata.bathrooms || 0;
  const squareFeet = property.metadata.square_feet;
  const features = property.metadata.features || [];

  return (
    <div className={`card card-hover ${className}`}>
      <Link href={`/properties/${property.slug}`}>
        <div className="aspect-video overflow-hidden rounded-t-lg">
          {mainImage?.imgix_url ? (
            <img
              src={`${mainImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={property.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 flex-1">
              {property.title}
            </h3>
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full whitespace-nowrap ml-2">
              {propertyStatus}
            </span>
          </div>
          
          <p className="text-gray-600 mb-3 line-clamp-2">
            {property.metadata.address}
          </p>
          
          <div className="text-2xl font-bold text-blue-600 mb-4">
            {formatPrice(property.metadata.price)}
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
            <div className="flex space-x-4">
              <span>{bedrooms} bed{bedrooms !== 1 ? 's' : ''}</span>
              <span>{bathrooms} bath{bathrooms !== 1 ? 's' : ''}</span>
              {squareFeet && (
                <span>{squareFeet.toLocaleString()} sqft</span>
              )}
            </div>
            <span className="text-blue-600 font-medium">
              {propertyType}
            </span>
          </div>
          
          {features.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {features.slice(0, 3).map((feature: string, index: number) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                >
                  {feature}
                </span>
              ))}
              {features.length > 3 && (
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                  +{features.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}