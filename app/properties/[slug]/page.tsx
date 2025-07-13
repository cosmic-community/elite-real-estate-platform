// app/properties/[slug]/page.tsx
import { getProperty } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import PropertyGallery from '@/components/PropertyGallery';
import AgentCard from '@/components/AgentCard';
import ContactForm from '@/components/ContactForm';
import { Property } from '@/types';

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  
  const property = await getProperty(slug);

  if (!property) {
    notFound();
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const propertyType = property.metadata.property_type?.value || 'Property';
  const propertyStatus = property.metadata.property_status?.value || 'Available';
  const bedrooms = property.metadata.bedrooms || 0;
  const bathrooms = property.metadata.bathrooms || 0;
  const squareFeet = property.metadata.square_feet;
  const features = property.metadata.features || [];
  const gallery = property.metadata.gallery || [];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Property Gallery */}
          <div>
            <PropertyGallery images={gallery} />
          </div>
          
          {/* Property Details */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {property.title}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {property.metadata.address}
              </p>
              <div className="text-3xl font-bold text-blue-600 mb-4">
                {formatPrice(property.metadata.price)}
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {propertyStatus}
              </div>
            </div>
            
            {/* Property Features */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {bedrooms}
                </div>
                <div className="text-sm text-gray-600">Bedroom{bedrooms !== 1 ? 's' : ''}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {bathrooms}
                </div>
                <div className="text-sm text-gray-600">Bathroom{bathrooms !== 1 ? 's' : ''}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {squareFeet?.toLocaleString() || 'N/A'}
                </div>
                <div className="text-sm text-gray-600">Sq Ft</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-900">
                  {propertyType}
                </div>
                <div className="text-sm text-gray-600">Type</div>
              </div>
            </div>
            
            {/* Description */}
            {property.metadata.description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {property.metadata.description}
                </p>
              </div>
            )}
            
            {/* Features */}
            {features.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Features
                </h2>
                <div className="flex flex-wrap gap-2">
                  {features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="mt-12">
          <ContactForm property={property} />
        </div>
        
        {/* Listing Agent */}
        {property.metadata.listing_agent && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Listing Agent
            </h2>
            <div className="max-w-md">
              <AgentCard agent={property.metadata.listing_agent} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}