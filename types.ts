export interface CosmicFile {
  url: string
  imgix_url: string
}

export interface PropertyType {
  key: string
  value: string
}

export interface PropertyStatus {
  key: string
  value: string
}

export interface PropertyMetadata {
  address: string
  price: number
  property_type: PropertyType
  bedrooms: number
  bathrooms: number
  square_feet?: number
  description?: string
  features?: string[]
  gallery?: CosmicFile[]
  property_status: PropertyStatus
  listing_agent?: Agent
}

export interface Property {
  id: string
  title: string
  slug: string
  metadata: PropertyMetadata
}

export interface AgentMetadata {
  full_name: string
  bio?: string
  phone?: string
  email?: string
  photo?: CosmicFile
  specialties?: string[]
  office?: Office | string
}

export interface Agent {
  id: string
  title: string
  slug: string
  metadata: AgentMetadata
}

export interface OfficeMetadata {
  office_name: string
  address: string
  phone?: string
  service_areas?: string
}

export interface Office {
  id: string
  title: string
  slug: string
  metadata: OfficeMetadata
}

export interface AboutPageMetadata {
  hero_title: string
  hero_subtitle: string
  hero_image?: CosmicFile
  story_title: string
  story_content: string
  story_image?: CosmicFile
  mission_statement: string
  values_title: string
  values: AboutValue[]
  team_title: string
  team_description: string
  cta_title: string
  cta_description: string
}

export interface AboutValue {
  title: string
  description: string
  icon: string
}

export interface AboutPage {
  id: string
  title: string
  slug: string
  metadata: AboutPageMetadata
}

export interface CosmicResponse<T> {
  objects: T[]
  total: number
}

export interface PropertyFilters {
  type?: string
  status?: string
  minPrice?: number
  maxPrice?: number
  minBedrooms?: number
  maxBedrooms?: number
  minBathrooms?: number
  maxBathrooms?: number
}

// Type guards
export function isOfficeObject(office: Office | string | undefined): office is Office {
  return office !== undefined && typeof office === 'object' && 'metadata' in office;
}

// Component Props Types
export interface AgentCardProps {
  agent: Agent
  className?: string
}

export interface PropertyCardProps {
  property: Property
  className?: string
}