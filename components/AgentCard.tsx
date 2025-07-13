import Link from 'next/link';
import { AgentCardProps } from '@/types';

export default function AgentCard({ agent, className = '' }: AgentCardProps) {
  return (
    <div className={`card card-hover ${className}`}>
      <Link href={`/agents/${agent.slug}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
              {agent.metadata.photo ? (
                <img
                  src={`${agent.metadata.photo.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                  alt={agent.metadata.full_name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-secondary-200 flex items-center justify-center">
                  <svg className="w-8 h-8 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-secondary-900">
                {agent.metadata.full_name}
              </h3>
              {agent.metadata.office && (
                <p className="text-secondary-600 text-sm">
                  {agent.metadata.office.metadata.office_name}
                </p>
              )}
            </div>
          </div>
          
          {agent.metadata.bio && (
            <p className="text-secondary-700 mb-4 line-clamp-3">
              {agent.metadata.bio}
            </p>
          )}
          
          {agent.metadata.specialties && agent.metadata.specialties.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-secondary-900 mb-2">
                Specialties
              </h4>
              <div className="flex flex-wrap gap-1">
                {agent.metadata.specialties.slice(0, 3).map((specialty, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-primary-100 text-primary-800 rounded"
                  >
                    {specialty}
                  </span>
                ))}
                {agent.metadata.specialties.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-primary-100 text-primary-800 rounded">
                    +{agent.metadata.specialties.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center text-sm text-secondary-600">
            {agent.metadata.phone && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{agent.metadata.phone}</span>
              </div>
            )}
            {agent.metadata.email && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="truncate">{agent.metadata.email}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}