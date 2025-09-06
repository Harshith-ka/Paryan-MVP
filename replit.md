# Overview

VillageWander is a tourism platform inspired by TripAdvisor, designed to connect travelers with authentic village experiences and local communities. The platform focuses on cultural immersion, traditional accommodations, local activities, and community engagement rather than typical mass tourism. It serves as a marketplace for village-based tourism experiences including homestays, cultural workshops, local guides, and community events.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight, hook-based client-side routing
- **Styling**: Tailwind CSS with a custom design system featuring earth-tone colors (terra, sage, amber, charcoal)
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible design
- **State Management**: TanStack Query for server state management and data fetching
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for full-stack type safety
- **API Pattern**: RESTful API with `/api` prefix for all endpoints
- **Session Management**: Express sessions with PostgreSQL session storage
- **Development**: Hot module replacement and runtime error overlay for development experience

## Data Layer
- **Database**: PostgreSQL as the primary database
- **ORM**: Drizzle ORM for type-safe database operations and schema management
- **Migrations**: Drizzle Kit for database schema migrations
- **Connection**: Neon Database serverless PostgreSQL connection

## Design System
- **Typography**: Nunito Sans font family for modern, friendly appearance
- **Color Palette**: Custom CSS variables for terra cotta, sage green, amber, charcoal, and warm gray
- **Theme Support**: Light/dark theme capability with CSS custom properties
- **Component Library**: Comprehensive UI component system built on Radix primitives

## Application Structure
- **Page-Based Architecture**: Dedicated pages for each major feature (explore, stays, activities, community, etc.)
- **Component Organization**: Modular components organized by feature (Village, Stay, Activity, Community)
- **Shared Schema**: Common TypeScript interfaces in shared directory for frontend/backend consistency
- **Asset Management**: Separate directory for attached assets and design requirements

## Key Features
- **Destination Exploration**: Village discovery with filtering by region, type, and cultural attributes
- **Accommodation Booking**: Traditional homestays, eco-lodges, and village accommodations
- **Activity Marketplace**: Cultural workshops, food experiences, nature activities, and festivals
- **Community Hub**: Travel forums, story sharing, Q&A, and meetup organization
- **Travel Planning**: Itinerary creation, saving, and sharing capabilities
- **Review System**: Comprehensive review and rating system for stays, activities, and hosts
- **Host Profiles**: Local host showcases with verification and messaging systems

# External Dependencies

## Core Framework Dependencies
- **React Ecosystem**: React 18+ with React DOM for UI rendering
- **TanStack Query**: Server state management and caching
- **Wouter**: Lightweight routing library for navigation

## UI and Styling
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Radix UI**: Accessible component primitives (accordion, dialog, dropdown, etc.)
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Utility for managing component variants
- **Embla Carousel**: Touch-friendly carousel implementation

## Database and Backend
- **Drizzle ORM**: Type-safe PostgreSQL ORM with schema validation
- **Neon Database**: Serverless PostgreSQL hosting
- **Connect PG Simple**: PostgreSQL session store for Express
- **Drizzle Zod**: Runtime validation for database schemas

## Form Handling and Validation
- **React Hook Form**: Form state management and validation
- **Hookform Resolvers**: Integration between React Hook Form and validation libraries
- **Zod**: Schema validation (via Drizzle Zod integration)

## Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the application
- **ESBuild**: Fast JavaScript bundler for production builds
- **TSX**: TypeScript execution for development
- **Replit Plugins**: Development environment integration and error handling