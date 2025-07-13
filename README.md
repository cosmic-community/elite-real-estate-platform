# Elite Real Estate Platform

![Elite Real Estate Platform](https://imgix.cosmicjs.com/1bc0b6b0-5fb1-11f0-a051-23c10f41277a-photo-1568605114967-8130f3a36994-1752387472775.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive real estate platform built with Next.js that showcases luxury properties, professional agents, and office locations. Browse properties, filter by criteria, and connect with specialized real estate professionals.

## Features

- **Property Listings**: Browse luxury homes, condos, townhouses, and apartments
- **Agent Profiles**: Professional real estate agents with specialties and contact information
- **Office Locations**: Find office locations with service areas and contact details
- **Advanced Filtering**: Filter properties by type, price, bedrooms, bathrooms, and features
- **Image Galleries**: High-resolution property photos with imgix optimization
- **Responsive Design**: Seamless experience across all devices
- **Dynamic Content**: Real-time content updates from Cosmic CMS

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=real-estate-production)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Real Estate website"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket. Set apiEnvironment: "staging" in cosmic config

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Cosmic**: Headless CMS for content management
- **Imgix**: Image optimization and transformation

## Getting Started

### Prerequisites

- Node.js 18+ 
- Bun package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Add your Cosmic credentials to `.env.local`:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

5. Run the development server:
   ```bash
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Properties
```typescript
import { cosmic } from '@/lib/cosmic'

const properties = await cosmic.objects
  .find({ type: 'properties' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Agents with Office Information
```typescript
const agents = await cosmic.objects
  .find({ type: 'agents' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Filtering Properties by Type
```typescript
const condos = await cosmic.objects
  .find({ 
    type: 'properties',
    'metadata.property_type': 'condo'
  })
  .depth(1)
```

## Cosmic CMS Integration

This application integrates with [Cosmic](https://www.cosmicjs.com) for content management. The content model includes:

- **Properties**: Real estate listings with images, details, and agent information
- **Agents**: Professional profiles with photos, specialties, and office associations
- **Offices**: Location information with service areas and contact details

For more information on the Cosmic SDK, visit the [Cosmic documentation](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `out`
4. Add environment variables
5. Deploy

### Environment Variables
Set these in your deployment platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

<!-- README_END -->