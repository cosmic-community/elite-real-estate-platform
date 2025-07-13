// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  published_at?: string;
}

// Property type definitions
interface Property extends CosmicObject {
  type: 'properties';
  metadata: {
    address: string;
    price: number;
    property_type: {
      key: string;
      value: string;
    };
    bedrooms: number;
    bathrooms: number;
    square_feet?: number;
    description?: string;
    features?: string[];
    gallery?: {
      url: string;
      imgix_url: string;
    }[];
    property_status: {
      key: string;
      value: string;
    };
    listing_agent?: Agent;
  };
}

// Agent type definitions
interface Agent extends CosmicObject {
  type: 'agents';
  metadata: {
    full_name: string;
    bio?: string;
    phone?: string;
    email?: string;
    photo?: {
      url: string;
      imgix_url: string;
    };
    specialties?: string[];
    office?: Office;
  };
}

// Office type definitions
interface Office extends CosmicObject {
  type: 'offices';
  metadata: {
    office_name: string;
    address: string;
    phone?: string;
    service_areas?: string;
  };
}

// Type literals for select-dropdown values
type PropertyType = 'house' | 'condo' | 'townhouse' | 'apartment';
type PropertyStatus = 'sale' | 'rent' | 'sold';

// API response types
interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Filter types - aligned with PropertyFilter component
interface PropertyFilters {
  type?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
}

// Component prop types
interface PropertyCardProps {
  property: Property;
  className?: string;
}

interface AgentCardProps {
  agent: Agent;
  className?: string;
}

interface OfficeCardProps {
  office: Office;
  className?: string;
}

// Type guards
function isProperty(obj: CosmicObject): obj is Property {
  return obj.type === 'properties';
}

function isAgent(obj: CosmicObject): obj is Agent {
  return obj.type === 'agents';
}

function isOffice(obj: CosmicObject): obj is Office {
  return obj.type === 'offices';
}

// Utility types
type CreatePropertyData = Omit<Property, 'id' | 'created_at' | 'modified_at'>;
type UpdatePropertyData = Partial<CreatePropertyData>;

export type {
  CosmicObject,
  Property,
  Agent,
  Office,
  PropertyType,
  PropertyStatus,
  CosmicResponse,
  PropertyFilters,
  PropertyCardProps,
  AgentCardProps,
  OfficeCardProps,
  CreatePropertyData,
  UpdatePropertyData
};

export {
  isProperty,
  isAgent,
  isOffice
};