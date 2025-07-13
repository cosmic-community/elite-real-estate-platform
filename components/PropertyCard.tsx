import Link from 'next/link';
import { PropertyCardProps } from '@/types';

export default function PropertyCard({ property, className = '' }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const mainImage = property.metadata.gallery?.[0];

  return (
    <div className={`card card-hover ${className}`}>
      <Link href={`/properties/${property.slug}`}>
        <div className="aspect-video overflow-hidden">
          {mainImage ? (
            <img
              src={`${mainImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={property.title}
              width={400}
              height={300}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-secondary-200 flex items-center justify-center">
              <svg className="w-16 h-16 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-secondary-900 line-clamp-2">
              {property.title}
            </h3>
            <span className="text-xs px-2 py-1 bg-primary-100 text-primary-800 rounded-full whitespace-nowrap ml-2">
              {property.metadata.property_status.value}
            </span>
          </div>
          
          <p className="text-secondary-600 mb-3 line-clamp-2">
            {property.metadata.address}
          </p>
          
          <div className="text-2xl font-bold text-primary-600 mb-4">
            {formatPrice(property.metadata.price)}
          </div>
          
          <div className="flex justify-between items-center text-sm text-secondary-600">
            <div className="flex space-x-4">
              <span>{property.metadata.bedrooms} bed</span>
              <span>{property.metadata.bathrooms} bath</span>
              {property.metadata.square_feet && (
                <span>{property.metadata.square_feet.toLocaleString()} sqft</span>
              )}
            </div>
            <span className="text-primary-600 font-medium">
              {property.metadata.property_type.value}
            </span>
          </div>
          
          {property.metadata.features && property.metadata.features.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {property.metadata.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-secondary-100 text-secondary-700 rounded"
                >
                  {feature}
                </span>
              ))}
              {property.metadata.features.length > 3 && (
                <span className="text-xs px-2 py-1 bg-secondary-100 text-secondary-700 rounded">
                  +{property.metadata.features.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}