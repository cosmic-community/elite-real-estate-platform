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
              {agent.metadata.photo?.imgix_url && (
                <img
                  src={`${agent.metadata.photo.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                  alt={agent.metadata.full_name}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              )}
            </div>
            
            {/* Agent Details */}
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 mb-4">
                {agent.metadata.full_name}
              </h1>
              
              {/* Contact Information */}
              <div className="space-y-3 mb-6">
                {agent.metadata.phone && (
                  <div className="flex items-center">
                    <span className="text-secondary-600 font-medium">Phone:</span>
                    <span className="ml-2 text-secondary-900">{agent.metadata.phone}</span>
                  </div>
                )}
                {agent.metadata.email && (
                  <div className="flex items-center">
                    <span className="text-secondary-600 font-medium">Email:</span>
                    <span className="ml-2 text-secondary-900">{agent.metadata.email}</span>
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
              
              {/* Office Information */}
              {agent.metadata.office && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-secondary-900 mb-3">
                    Office
                  </h2>
                  <div className="bg-secondary-50 p-4 rounded-lg">
                    <h3 className="font-medium text-secondary-900 mb-2">
                      {agent.metadata.office.metadata.office_name}
                    </h3>
                    <p className="text-secondary-700 whitespace-pre-line">
                      {agent.metadata.office.metadata.address}
                    </p>
                    {agent.metadata.office.metadata.phone && (
                      <p className="text-secondary-700 mt-2">
                        {agent.metadata.office.metadata.phone}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Bio */}
          {agent.metadata.bio && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
                About {agent.metadata.full_name}
              </h2>
              <p className="text-secondary-700 leading-relaxed">
                {agent.metadata.bio}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading agent:', error);
    notFound();
  }
}