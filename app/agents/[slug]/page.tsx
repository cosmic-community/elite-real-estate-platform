// app/agents/[slug]/page.tsx
import { getAgent } from '@/lib/cosmic';
import { notFound } from 'next/navigation';

interface AgentPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AgentPage({ params }: AgentPageProps) {
  const { slug } = await params;
  const agent = await getAgent(slug);

  if (!agent) {
    notFound();
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Agent Photo */}
            <div>
              {agent.metadata.photo && (
                <img
                  src={`${agent.metadata.photo.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
                  alt={agent.metadata.full_name}
                  width={300}
                  height={300}
                  className="w-full h-96 object-cover rounded-lg"
                />
              )}
            </div>
            
            {/* Agent Information */}
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 mb-2">
                {agent.metadata.full_name}
              </h1>
              
              {/* Contact Information */}
              <div className="space-y-2 mb-6">
                {agent.metadata.phone && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-secondary-700">{agent.metadata.phone}</span>
                  </div>
                )}
                
                {agent.metadata.email && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href={`mailto:${agent.metadata.email}`} className="text-primary-600 hover:text-primary-700">
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
              
              {/* Office Information */}
              {agent.metadata.office && (
                <div className="bg-secondary-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                    Office Location
                  </h3>
                  <p className="text-secondary-700">
                    {agent.metadata.office.metadata.office_name}
                  </p>
                  <p className="text-secondary-600 text-sm">
                    {agent.metadata.office.metadata.address}
                  </p>
                  {agent.metadata.office.metadata.phone && (
                    <p className="text-secondary-600 text-sm">
                      {agent.metadata.office.metadata.phone}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}