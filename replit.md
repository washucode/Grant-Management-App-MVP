# Grant Management System

## Overview

A professional grant management application built for tracking grant programs, applications, applicants, and disbursements. The system provides a comprehensive dashboard for managing the complete grant lifecycle from application submission through approval and disbursement.

The application follows Material Design 3 principles adapted for enterprise financial applications, with a clean, professional aesthetic inspired by Linear and Stripe Dashboard.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React** with TypeScript for type-safe component development
- **Vite** as the build tool and development server
- **Wouter** for client-side routing (lightweight alternative to React Router)
- **TanStack Query** for server state management, caching, and data synchronization

**UI Component Strategy**
- **shadcn/ui** component library built on Radix UI primitives
- Custom components in `client/src/components/` for domain-specific needs
- Component examples in `client/src/components/examples/` for development reference
- Material Design 3 principles with custom Tailwind configuration

**Styling Approach**
- **Tailwind CSS** with custom design tokens defined in `client/src/index.css`
- CSS variables for theme customization (light/dark mode support)
- Inter font family loaded via Google Fonts CDN
- Custom spacing scale and typography hierarchy documented in `design_guidelines.md`

**State Management**
- TanStack Query for server state (applications, programs, applicants)
- React hooks for local component state
- No global state management library (Redux, Zustand) - data fetching handles most needs

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript for REST API endpoints
- Custom middleware for request logging and JSON body parsing
- Session-based architecture prepared (connect-pg-simple for session store)

**API Design Pattern**
- RESTful endpoints organized by resource:
  - `/api/programs` - Grant program CRUD operations
  - `/api/applications` - Application management and status updates
  - `/api/applicants` - Applicant information
  - `/api/disbursements` - Payment tracking
  - `/api/stats` - Dashboard statistics
- Consistent error handling with appropriate HTTP status codes
- Request/response logging for API debugging

**Business Logic Layer**
- Storage abstraction interface (`server/storage.ts`) defines data operations
- Separates database implementation from route handlers
- Enables easy testing and potential database migrations

### Data Storage

**Database**
- **PostgreSQL** via Neon serverless database
- **Drizzle ORM** for type-safe database queries and migrations
- WebSocket connections for serverless compatibility (Neon requirement)

**Schema Design**
- `applicants` - Individual or business entities applying for grants
- `grantPrograms` - Available grant programs with budgets and deadlines
- `applications` - Grant applications linking applicants to programs
- `disbursements` - Payment records tracking fund distribution
- `applicationTimeline` - Audit trail of application status changes

**Data Validation**
- **Zod** schemas derived from Drizzle table definitions
- `drizzle-zod` integration for automatic schema generation
- Validation at API boundaries before database operations

**Migration Strategy**
- Drizzle Kit for schema migrations (`npm run db:push`)
- Migration files stored in `/migrations` directory
- Schema source of truth in `shared/schema.ts`

### Code Organization

**Monorepo Structure**
- `/client` - React frontend application
- `/server` - Express backend API
- `/shared` - Code shared between client and server (schemas, types)
- `/db` - Database connection and seeding utilities

**Path Aliases**
- `@/` → `client/src/` for frontend imports
- `@shared/` → `shared/` for shared code
- `@db/` → `db/` for database utilities
- Configured in both `tsconfig.json` and `vite.config.ts`

**Build Process**
- Development: Vite dev server + tsx for backend hot-reload
- Production: Vite builds static frontend, esbuild bundles backend
- Frontend output: `dist/public/`
- Backend output: `dist/index.js`

### Authentication & Authorization

**Current State**
- No authentication currently implemented
- Session infrastructure prepared (connect-pg-simple dependency)
- Storage layer designed to support user-scoped queries

**Future Considerations**
- Session-based authentication likely choice (infrastructure in place)
- Role-based access control for different user types (applicants, reviewers, administrators)
- Audit trail already established via timeline events

## External Dependencies

### Third-Party UI Libraries
- **Radix UI** - Headless component primitives (dialogs, dropdowns, tooltips, etc.)
- **class-variance-authority** - Component variant styling
- **cmdk** - Command palette component
- **Lucide React** - Icon library

### Database & Data
- **@neondatabase/serverless** - PostgreSQL database client
- **Drizzle ORM** - Type-safe database toolkit
- **Zod** - Schema validation library

### Development Tools
- **TypeScript** - Type safety across the stack
- **ESBuild** - Production backend bundling
- **PostCSS** with Autoprefixer - CSS processing
- **@replit/vite-plugin-*** - Replit-specific development enhancements

### Forms & Data Fetching
- **React Hook Form** - Form state management
- **@hookform/resolvers** - Zod integration for form validation
- **TanStack Query** - Server state management

### Utility Libraries
- **date-fns** - Date manipulation and formatting
- **clsx** & **tailwind-merge** - Conditional className composition
- **nanoid** - Unique ID generation

### Notable Patterns
- No authentication service integration (could add Auth0, Clerk, etc.)
- No email service integration (could add SendGrid, Postmark for notifications)
- No file storage service (could add S3, Cloudinary for document uploads)
- No payment processing (future: Stripe for disbursement automation)