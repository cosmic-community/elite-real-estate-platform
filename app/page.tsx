import { getProperties, getAgents } from '@/lib/cosmic';
import PropertyCard from '@/components/PropertyCard';
import AgentCard from '@/components/AgentCard';
import Hero from '@/components/Hero';
import Link from 'next/link';

export default async function HomePage() {
  const properties = await getProperties();
  const agents = await getAgents();
  
  const featuredProperties = properties.slice(0, 3);
  const featuredAgents = agents.slice(0, 2);

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Featured Properties */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Discover exceptional properties in prime locations with luxury amenities and stunning designs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/properties" className="btn btn-primary text-lg px-8 py-3">
              View All Properties
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Agents */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Our Expert Agents
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Meet our professional real estate agents who specialize in luxury properties and exceptional service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {featuredAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/agents" className="btn btn-primary text-lg px-8 py-3">
              Meet All Agents
            </Link>
          </div>
        </div>
      </section>
      
      {/* Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Comprehensive real estate services tailored to your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Property Sales</h3>
              <p className="text-secondary-600">Expert assistance in buying and selling luxury properties</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Investment Properties</h3>
              <p className="text-secondary-600">Strategic guidance for real estate investment opportunities</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Market Analysis</h3>
              <p className="text-secondary-600">Comprehensive market insights and property valuations</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}