// app/agents/[slug]/page.tsx
import { getAgent } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import { Agent } from '@/types';

interface AgentPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AgentPage({ params }: AgentPageProps) {
  const { slug } = await params;
  
  try {
    const agent = await getAgent(slug);

    if (!agent) {
      notFound();
    }

    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Agent Photo */}
            <div>
              {agent.metadata.photo ? (
                <img
                  src={`${agent.metadata.photo.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                  alt={agent.metadata.full_name}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              ) : (
                <div className="w-full h-96 bg-secondary-200 rounded-lg flex items-center justify-center">
                  <svg className="w-24 h-24 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* Agent Details */}
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 mb-2">
                {agent.metadata.full_name}
              </h1>
              
              {/* Contact Info */}
              <div className="space-y-2 mb-6">
                {agent.metadata.phone && (
                  <div className="flex items-center text-secondary-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href={`tel:${agent.metadata.phone}`} className="hover:text-primary-600 transition-colors">
                      {agent.metadata.phone}
                    </a>
                  </div>
                )}
                
                {agent.metadata.email && (
                  <div className="flex items-center text-secondary-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href={`mailto:${agent.metadata.email}`} className="hover:text-primary-600 transition-colors">
                      {agent.metadata.email}
                    </a>
                  </div>
                )}
              </div>
              
              {/* Specialties */}
              {agent.metadata.specialties && agent.metadata.specialties.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-secondary-900 mb-3">
                    Specialties
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {agent.metadata.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Bio */}
              {agent.metadata.bio && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-secondary-900 mb-3">
                    About
                  </h2>
                  <p className="text-secondary-700 leading-relaxed">
                    {agent.metadata.bio}
                  </p>
                </div>
              )}
              
              {/* Office */}
              {agent.metadata.office && (
                <div>
                  <h2 className="text-xl font-semibold text-secondary-900 mb-3">
                    Office
                  </h2>
                  <div className="bg-secondary-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-secondary-900 mb-2">
                      {agent.metadata.office.metadata.office_name}
                    </h3>
                    <p className="text-secondary-700 text-sm whitespace-pre-line">
                      {agent.metadata.office.metadata.address}
                    </p>
                    {agent.metadata.office.metadata.phone && (
                      <p className="text-secondary-700 text-sm mt-1">
                        {agent.metadata.office.metadata.phone}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading agent:', error);
    notFound();
  }
}