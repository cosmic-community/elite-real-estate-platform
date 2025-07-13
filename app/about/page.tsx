import { getAboutPage, getAgents } from '@/lib/cosmic';
import { AboutPage, Agent, AboutValue } from '@/types';
import Link from 'next/link';
import AgentCard from '@/components/AgentCard';

export default async function About() {
  const aboutPage: AboutPage | null = await getAboutPage();
  const agents: Agent[] = await getAgents();

  if (!aboutPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-900 mb-4">About Page Not Found</h1>
          <p className="text-secondary-600">
            The about page content is not available at the moment.
          </p>
        </div>
      </div>
    );
  }

  const { metadata } = aboutPage;

  // Parse values JSON safely
  let parsedValues: AboutValue[] = [];
  try {
    parsedValues = typeof metadata.values === 'string' 
      ? JSON.parse(metadata.values) 
      : metadata.values;
  } catch (error) {
    console.error('Error parsing values JSON:', error);
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white py-24">
        {metadata.hero_image && (
          <div className="absolute inset-0">
            <img
              src={`${metadata.hero_image.imgix_url}?w=1920&h=800&fit=crop&auto=format,compress`}
              alt="About Hero"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {metadata.hero_title}
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 leading-relaxed">
              {metadata.hero_subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                {metadata.story_title}
              </h2>
              <div 
                className="text-lg text-secondary-700 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: metadata.story_content }}
              />
            </div>
            {metadata.story_image && (
              <div className="lg:order-last">
                <img
                  src={`${metadata.story_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                  alt="Our Story"
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-8">
            Our Mission
          </h2>
          <p className="text-xl text-secondary-700 leading-relaxed">
            {metadata.mission_statement}
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              {metadata.values_title}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {parsedValues.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-secondary-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-secondary-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              {metadata.team_title}
            </h2>
            <p className="text-xl text-secondary-700 max-w-3xl mx-auto">
              {metadata.team_description}
            </p>
          </div>
          
          {agents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {agents.slice(0, 6).map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-secondary-600">No agents found.</p>
            </div>
          )}
          
          {agents.length > 6 && (
            <div className="text-center mt-12">
              <Link
                href="/agents"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
              >
                View All Agents
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 lg:py-24 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {metadata.cta_title}
          </h2>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            {metadata.cta_description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/properties"
              className="inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 transition-colors"
            >
              Browse Properties
            </Link>
            <Link
              href="/agents"
              className="inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-primary-700 transition-colors"
            >
              Meet Our Agents
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}