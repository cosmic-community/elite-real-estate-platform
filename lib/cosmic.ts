import { createBucketClient } from '@cosmicjs/sdk';
import { Property, Agent, Office, PropertyFilters, AboutPage } from '../types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: "staging"
});

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Property functions
export async function getProperties(): Promise<Property[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'properties' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Property[];
  } catch (error) {
    console.error('Error fetching properties:', error);
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    return [];
  }
}

export async function getProperty(slug: string): Promise<Property | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'properties',
        slug 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as Property;
  } catch (error) {
    console.error(`Error fetching property ${slug}:`, error);
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    return null;
  }
}

export async function getFilteredProperties(filters: PropertyFilters): Promise<Property[]> {
  try {
    const query: Record<string, any> = { type: 'properties' };
    
    if (filters.type) {
      query['metadata.property_type'] = filters.type;
    }
    
    if (filters.status) {
      query['metadata.property_status'] = filters.status;
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    let properties = response.objects as Property[];
    
    // Apply client-side filters for ranges
    if (filters.minPrice) {
      properties = properties.filter(p => p.metadata.price >= filters.minPrice!);
    }
    
    if (filters.maxPrice) {
      properties = properties.filter(p => p.metadata.price <= filters.maxPrice!);
    }
    
    if (filters.minBedrooms) {
      properties = properties.filter(p => p.metadata.bedrooms >= filters.minBedrooms!);
    }
    
    if (filters.maxBedrooms) {
      properties = properties.filter(p => p.metadata.bedrooms <= filters.maxBedrooms!);
    }
    
    if (filters.minBathrooms) {
      properties = properties.filter(p => p.metadata.bathrooms >= filters.minBathrooms!);
    }
    
    if (filters.maxBathrooms) {
      properties = properties.filter(p => p.metadata.bathrooms <= filters.maxBathrooms!);
    }
    
    return properties;
  } catch (error) {
    console.error('Error fetching filtered properties:', error);
    return [];
  }
}

// Agent functions
export async function getAgents(): Promise<Agent[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'agents' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Agent[];
  } catch (error) {
    console.error('Error fetching agents:', error);
    return [];
  }
}

export async function getAgent(slug: string): Promise<Agent | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'agents',
        slug 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as Agent;
  } catch (error) {
    console.error(`Error fetching agent ${slug}:`, error);
    return null;
  }
}

// Office functions
export async function getOffices(): Promise<Office[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'offices' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Office[];
  } catch (error) {
    console.error('Error fetching offices:', error);
    return [];
  }
}

export async function getOffice(slug: string): Promise<Office | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'offices',
        slug 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as Office;
  } catch (error) {
    console.error(`Error fetching office ${slug}:`, error);
    return null;
  }
}

// About page functions
export async function getAboutPage(): Promise<AboutPage | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'about-page'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as AboutPage;
  } catch (error) {
    console.error('Error fetching about page:', error);
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    return null;
  }
}