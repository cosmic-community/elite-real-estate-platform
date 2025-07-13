// app/properties/[slug]/page.tsx
import { getProperty } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import PropertyGallery from '@/components/PropertyGallery';
import AgentCard from '@/components/AgentCard';
import { Property } from '@/types';

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  
  try {
    const property = await getProperty(slug);

    if (!property) {
      notFound();
    }

    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);
    };

    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Property Gallery */}
            <div>
              <PropertyGallery images={property.metadata.gallery || []} />
            </div>
            
            {/* Property Details */}
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-secondary-900 mb-2">
                  {property.title}
                </h1>
                <p className="text-lg text-secondary-600 mb-4">
                  {property.metadata.address}
                </p>
                <div className="text-3xl font-bold text-primary-600 mb-4">
                  {formatPrice(property.metadata.price)}
                </div>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  {property.metadata.property_status?.value || 'N/A'}
                </div>
              </div>
              
              {/* Property Features */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-secondary-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-secondary-900">
                    {property.metadata.bedrooms}
                  </div>
                  <div className="text-sm text-secondary-600">Bedrooms</div>
                </div>
                <div className="bg-secondary-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-secondary-900">
                    {property.metadata.bathrooms}
                  </div>
                  <div className="text-sm text-secondary-600">Bathrooms</div>
                </div>
                <div className="bg-secondary-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-secondary-900">
                    {property.metadata.square_feet?.toLocaleString() || 'N/A'}
                  </div>
                  <div className="text-sm text-secondary-600">Sq Ft</div>
                </div>
                <div className="bg-secondary-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-secondary-900">
                    {property.metadata.property_type?.value || 'N/A'}
                  </div>
                  <div className="text-sm text-secondary-600">Type</div>
                </div>
              </div>
              
              {/* Description */}
              {property.metadata.description && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-secondary-900 mb-3">
                    Description
                  </h2>
                  <p className="text-secondary-700 leading-relaxed">
                    {property.metadata.description}
                  </p>
                </div>
              )}
              
              {/* Features */}
              {property.metadata.features && property.metadata.features.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-secondary-900 mb-3">
                    Features
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {property.metadata.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Listing Agent */}
          {property.metadata.listing_agent && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-6">
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
  } catch (error) {
    console.error('Error loading property:', error);
    notFound();
  }
}