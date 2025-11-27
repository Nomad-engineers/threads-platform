# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Threads-Boost is a comprehensive analytics and automation platform for Meta's Threads social media platform. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4, it provides content creators and businesses with advanced analytics, scheduling, and AI-powered insights.

## Development Commands

### Core Development
- `pnpm dev` - Start development server with Turbopack (recommended)
- `pnpm dev:standard` - Start development server without Turbopack
- `pnpm dev:clean` - Clean cache and start development server
- `pnpm build` - Build for production (includes Prisma generation)
- `pnpm build:clean` - Clean cache and build for production
- `pnpm start` - Start production server
- `pnpm analyze` - Analyze bundle size (sets ANALYZE=true)

### Code Quality
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues automatically
- `pnpm type-check` - Run TypeScript type checking without emitting files

### Testing
- `pnpm test` - Run Jest unit tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm test:e2e` - Run Playwright end-to-end tests

### Database Operations
- `pnpm db:generate` - Generate Prisma client from schema
- `pnpm db:migrate` - Apply database migrations
- `pnpm db:push` - Push schema changes to database
- `pnpm db:reset` - Reset database and reapply migrations
- `pnpm db:studio` - Open Prisma Studio database browser
- `pnpm db:seed` - Seed database with sample data

### Additional Commands
- `pnpm postinstall` - Generate Prisma client (runs automatically after install)
- `pnpm postbuild` - Generate sitemap after build

## Architecture Overview

### Full-Stack Next.js Structure
- **App Router**: Server Components by default, Client Components for interactivity
- **Route Groups**: `(auth)` for authentication pages, `(dashboard)` for main application
- **API Routes**: RESTful API in `app/api/` with middleware for rate limiting and auth
- **Database**: PostgreSQL with Prisma ORM and Redis caching
- **Authentication**: Threads OAuth 2.0 with token-based session management

### Key Directories
- `app/` - Next.js App Router pages and API routes
- `components/` - React components organized by feature
- `lib/` - Utilities, database connection, authentication configuration
- `types/` - TypeScript type definitions
- `hooks/` - Custom React hooks
- `docs/` - Comprehensive project documentation

### Component System
- **shadcn/ui**: Base UI components with Radix UI primitives
- **Custom Components**: Feature-specific components built on shadcn/ui
- **Path Aliases**: `@/components/*`, `@/lib/*`, `@/app/*`, `@/types/*`, `@/hooks/*`

## Database Schema

### Core Tables
- `users` - User accounts with Threads-specific authentication fields
- `threads_tokens` - OAuth tokens and session management for Threads API

### Database Schema Features
- **Threads-centric authentication** (OAuth-only, no email/password)
- **Subscription tiers** - FREE, CREATOR, PROFESSIONAL, BUSINESS
- **Token management** with refresh capabilities and expiration tracking
- **Timezone support** for global users

### Database Operations
Always use Prisma client for database operations. The client is generated with TypeScript types for type safety.

## API Architecture

### Route Structure
- `/api/auth/*` - Authentication endpoints (OAuth, session management)
- `/api/users/*` - User management and profile operations
- `/api/threads/*` - Threads API integration and data sync
- `/api/analytics/*` - Analytics data processing and insights
- `/api/scheduling/*` - Content scheduling and automation
- `/api/comments/*` - Comment management and bulk operations
- `/api/subscriptions/*` - Billing and subscription management

### Middleware Stack
1. Rate limiting with Redis
2. Authentication with JWT tokens
3. CORS configuration
4. Request logging and monitoring
5. Input validation with Zod schemas

## Authentication & Authorization

### Threads OAuth Integration
- OAuth 2.0 flow with Threads API
- Token-based session management with refresh capabilities
- Role-based access control by subscription tier
- Threads-specific user data (threadsUserId, threadsUsername)

### Permission Matrix
- **Free**: Basic analytics (10 posts/week, 30 days data)
- **Creator**: Full scheduling, advanced analytics (unlimited, 3 months data)
- **Professional**: Comment management, competitor tracking (1 year data)
- **Business**: Team collaboration, API access, white-label reports

## Development Patterns

### Component Development
- Use TypeScript interfaces for all props
- Implement proper error boundaries
- Follow server/client component patterns
- Use React.memo for expensive components
- Implement proper loading and error states

### API Development
- Use Next.js API routes with proper HTTP methods
- Implement consistent error handling and response format
- Use Zod for request/response validation
- Include proper authentication and authorization checks
- Follow RESTful conventions for API design

### Database Patterns
- Use Prisma for all database operations
- Implement proper error handling for database queries
- Use transactions for multi-table operations
- Implement proper indexing strategies
- Use read replicas for analytics queries when possible

## Performance Optimization

### Caching Strategy
- **Level 1**: Next.js built-in cache (API responses, static assets)
- **Level 2**: Redis for user sessions, computed analytics, rate limiting
- **Level 3**: Vercel Edge cache for static pages and assets

### Frontend Optimization
- Code splitting by route and components
- Next.js Image component for optimized images
- Bundle analysis and optimization
- Streaming server-side rendering
- Proper loading states and progressive enhancement

### Database Optimization
- Proper indexing on frequently queried columns
- Connection pooling for efficient resource usage
- Materialized views for complex analytics queries
- Read replicas for analytics workloads
- Query optimization and monitoring

## Security Practices

### Data Security
- Environment variables for all sensitive configuration
- Encrypted data storage for sensitive user information
- TLS 1.3 for all data transmission
- Regular security audits and dependency updates

### API Security
- Rate limiting based on subscription tiers
- Input validation and sanitization
- SQL injection prevention with parameterized queries
- CORS configuration for cross-origin requests
- JWT token validation and refresh mechanisms

## Testing Strategy

### Unit Testing
- Jest with React Testing Library
- Focus on business logic and component behavior
- Mock external dependencies (APIs, database)
- Maintain good coverage (>80%) for critical paths

### E2E Testing
- Playwright for user flow testing
- Critical paths: authentication, analytics, scheduling
- Cross-browser compatibility testing
- Mobile responsiveness testing

### Integration Testing
- API endpoint testing with mocked dependencies
- Database integration testing with test database
- Third-party service integration testing

## Monitoring & Observability

### Error Tracking
- Sentry for error monitoring and performance tracking
- Structured logging with correlation IDs
- Custom metrics for business KPIs
- Real-time alerting for critical issues

### Performance Monitoring
- Vercel Analytics for web performance
- Custom metrics for API response times
- Database query performance monitoring
- Cache hit rate optimization

## Environment Configuration

### Required Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `NEXTAUTH_URL` and `NEXTAUTH_SECRET` - NextAuth configuration
- `THREADS_CLIENT_ID/SECRET` - Threads API credentials
- `THREADS_REDIRECT_URI` - OAuth callback URL
- `SENDGRID_API_KEY` - Email service configuration
- `PADDLE_VENDOR_ID/AUTH_CODE` - Payment processing

### Development Setup
1. Copy `.env.example` to `.env.local`
2. Configure local PostgreSQL and Redis instances
3. Obtain Threads API developer credentials
4. Configure OAuth redirect URI in Threads developer console
5. Run `pnpm db:migrate` and `pnpm db:seed` for database setup

## Deployment

### Vercel Deployment (Recommended)
- Automatic deployments from main branch
- Preview deployments for pull requests
- Edge functions for global distribution
- Integrated analytics and monitoring

### Build Process
- Prisma client generation
- TypeScript compilation and type checking
- ESLint code formatting
- Next.js optimization and bundling
- Sitemap generation

## Common Development Workflows

### Adding New Features
1. Create feature branch from `main`
2. Implement components, API routes, and database changes
3. Add comprehensive tests
4. Update documentation if needed
5. Submit pull request with detailed description

### Database Schema Changes
1. Modify Prisma schema
2. Generate migration: `pnpm db:migrate --name descriptive_name`
3. Generate Prisma client: `pnpm db:generate`
4. Test migration on development database
5. Include migration in pull request

### API Development
1. Create route in appropriate `app/api/` directory
2. Implement request/response validation with Zod
3. Add authentication and authorization middleware
4. Implement error handling and proper HTTP status codes
5. Add comprehensive tests including edge cases

## Troubleshooting

### Common Issues
- **Database connection**: Check PostgreSQL service and connection string
- **Redis connection**: Verify Redis service and URL configuration
- **Build failures**: Check TypeScript types and linting issues
- **API errors**: Review environment variables and external service status

### Development Tools
- `pnpm db:studio` - Visual database browser
- Vercel Dev Tools for local debugging
- React DevTools for component inspection
- Redis Desktop Manager for cache inspection

## Additional Resources

- **Project Documentation**: [docs/README.md](docs/README.md)
- **Development Guide**: [docs/development/001-getting-started.md](docs/development/001-getting-started.md)
- **Architecture Overview**: [docs/architecture/001-system-overview.md](docs/architecture/001-system-overview.md)
- **API Reference**: Available at `/api/docs` in development
- **Component Library**: Based on [shadcn/ui](https://ui.shadcn.com/)

This codebase follows modern React and Next.js best practices with a focus on performance, scalability, and developer experience.

## Technology Stack Specifics

### Key Dependencies
- **Next.js 15.5.4** with React 19.1.0 - Latest features including App Router and Server Components
- **TypeScript 5.x** - Type safety across the entire stack
- **Tailwind CSS v4** - Modern utility-first CSS framework
- **Prisma 5.x** - Type-safe database ORM with PostgreSQL
- **shadcn/ui** - Professional component library built on Radix UI
- **NextAuth 5.0** - Authentication with Threads OAuth integration
- **Redis** - High-performance caching and session storage

### Package Manager
- **pnpm 8+** - Efficient, disk-space saving package manager
- All scripts use pnpm for consistency