import { getAgents } from '@/lib/cosmic';
import AgentCard from '@/components/AgentCard';

export default async function AgentsPage() {
  const agents = await getAgents();

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-secondary-900 mb-4">
            Our Real Estate Agents
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Meet our team of professional real estate agents who are dedicated to helping you find your dream property
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
        
        {agents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-secondary-600">
              No agents found. Please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}