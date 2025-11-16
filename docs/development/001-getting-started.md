# Getting Started with Threads-Boost Development

## Overview

This guide helps new developers set up their local development environment for Threads-Boost. Threads-Boost is built with modern web technologies and follows best practices for scalability and maintainability.

## Prerequisites

### Required Software
- **Node.js** 18+ (LTS version recommended)
- **pnpm** 8+ (package manager)
- **Git** 2.30+
- **PostgreSQL** 15+ (for local development)
- **Redis** 7+ (for caching)
- **Docker** 20+ (optional, for containerized development)

### Recommended Tools
- **VS Code** with recommended extensions
- **TablePlus** or **pgAdmin** for database management
- **Redis Desktop Manager** for Redis inspection
- **Postman** or **Insomnia** for API testing

### Development Accounts
- **GitHub** account (for code collaboration)
- **Threads** developer account (for API access)
- **Google Cloud** account (for Firebase services)
- **Vercel** account (for deployment)

## Installation

### 1. Clone Repository

```bash
# Clone the repository
git clone https://github.com/your-org/threads-boost.git
cd threads-boost

# Verify you're on the correct branch
git checkout develop
```

### 2. Install Dependencies

```bash
# Install pnpm if not already installed
npm install -g pnpm@8

# Install project dependencies
pnpm install

# Verify installation
pnpm --version
node --version
```

### 3. Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit environment variables
# See Environment Configuration section below
```

### 4. Database Setup

#### Option A: Local PostgreSQL & Redis
```bash
# Start PostgreSQL (using Homebrew on macOS)
brew services start postgresql@15

# Create database
createdb threads_boost_dev

# Start Redis
brew services start redis

# Run database migrations
pnpm db:migrate

# Seed database with sample data
pnpm db:seed
```

#### Option B: Docker (Recommended)
```bash
# Start required services
docker-compose up -d postgres redis

# Wait for services to be ready (10-15 seconds)
# Run database migrations
pnpm db:migrate

# Seed database with sample data
pnpm db:seed
```

### 5. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project or use existing
3. Enable Authentication → Google Provider
4. Enable Firestore Database (for development)
5. Download service account key
6. Add to `.env.local`:
```bash
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_CLIENT_SECRET=your-client-secret
```

## Environment Configuration

### Required Environment Variables

Create `.env.local` in the project root with the following:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/threads_boost_dev"
REDIS_URL="redis://localhost:6379"

# Next.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-here"

# Threads API Configuration
THREADS_CLIENT_ID="your-threads-client-id"
THREADS_CLIENT_SECRET="your-threads-client-secret"
THREADS_REDIRECT_URI="http://localhost:3000/api/auth/callback/threads"

# Firebase Configuration
FIREBASE_PROJECT_ID="your-firebase-project-id"
FIREBASE_CLIENT_ID="your-firebase-client-id"
FIREBASE_CLIENT_SECRET="your-firebase-client-secret"

# Email Service (SendGrid)
SENDGRID_API_KEY="your-sendgrid-api-key"
FROM_EMAIL="noreply@threads-boost.online"

# Payment Processing (Paddle)
PADDLE_VENDOR_ID="your-paddle-vendor-id"
PADDLE_VENDOR_AUTH_CODE="your-paddle-vendor-auth-code"

# Development
NODE_ENV="development"
```

### Optional Environment Variables

```bash
# Feature Flags
ENABLE_AI_FEATURES="true"
ENABLE_BULK_OPERATIONS="true"
ENABLE_COMPETITOR_ANALYSIS="false"

# Monitoring
SENTRY_DSN="your-sentry-dsn"
LOG_LEVEL="debug"

# Rate Limiting
REDIS_RATE_LIMIT_URL="redis://localhost:6379"
```

## Development Server

### Starting the Application

```bash
# Start development server with Turbopack (fast)
pnpm dev

# Or start without Turbopack
pnpm dev:standard

# The application will be available at:
# http://localhost:3000
```

### Accessing Development Tools

- **Application**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api/docs
- **Database Studio**: http://localhost:3000/admin (if enabled)
- **Redis Inspector**: Use Redis Desktop Manager

## Project Structure

### Understanding the Codebase

```
threads-boost/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard-specific components
│   └── forms/            # Form components
├── lib/                  # Utilities and configurations
│   ├── auth.ts          # NextAuth configuration
│   ├── db.ts            # Database connection
│   ├── utils.ts         # Utility functions
│   └── validations.ts   # Zod schemas
├── types/               # TypeScript type definitions
├── hooks/               # Custom React hooks
├── styles/              # CSS and styling
├── prisma/              # Database schema and migrations
│   ├── schema.prisma   # Database schema
│   └── migrations/      # Database migrations
├── public/              # Static assets
└── docs/               # Project documentation
```

## Common Development Tasks

### 1. Database Operations

```bash
# Create new migration
pnpm db:migrate --name add_new_table

# Apply pending migrations
pnpm db:migrate

# Reset database (development only)
pnpm db:reset

# View database in Prisma Studio
pnpm db:studio

# Generate Prisma client
pnpm db:generate
```

### 2. Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run E2E tests
pnpm test:e2e

# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix
```

### 3. Building

```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Analyze bundle size
pnpm analyze
```

## Development Workflow

### 1. Feature Development

```bash
# Create feature branch
git checkout -b feature/analytics-dashboard

# Make changes
# ...write code...

# Run tests
pnpm test

# Commit changes
git add .
git commit -m "feat: add analytics dashboard components"

# Push to remote
git push origin feature/analytics-dashboard
```

### 2. API Development

Create new API routes in `app/api/`:

```typescript
// app/api/analytics/overview/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch analytics data
    const data = await fetchUserAnalytics(session.user.id);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch analytics',
    }, { status: 500 });
  }
}
```

### 3. Component Development

Create new components following the established patterns:

```typescript
// components/analytics/overview-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface OverviewCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
}

export function OverviewCard({
  title,
  value,
  change,
  changeLabel
}: OverviewCardProps) {
  const isPositive = change && change > 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {change !== undefined && (
          isPositive ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <p className="text-xs text-muted-foreground">
            {isPositive ? '+' : ''}{change}% {changeLabel}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
```

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   ```bash
   # Check PostgreSQL status
   brew services list | grep postgresql

   # Restart PostgreSQL
   brew services restart postgresql@15

   # Check connection string in .env.local
   ```

2. **Redis Connection Issues**
   ```bash
   # Check Redis status
   redis-cli ping

   # Start Redis
   brew services start redis
   ```

3. **Module Import Errors**
   ```bash
   # Clear Next.js cache
   rm -rf .next

   # Reinstall dependencies
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

4. **TypeScript Errors**
   ```bash
   # Check TypeScript configuration
   npx tsc --noEmit

   # Regenerate Prisma types
   pnpm db:generate
   ```

### Getting Help

- **Slack/Discord**: #threads-boost-dev channel
- **GitHub Issues**: [Create new issue](https://github.com/your-org/threads-boost/issues)
- **Documentation**: [Full documentation](https://docs.threads-boost.online)

## Best Practices

### 1. Code Organization
- Keep components small and focused
- Use TypeScript for all new code
- Follow established naming conventions
- Write tests for new features

### 2. Performance
- Use React.memo for expensive components
- Implement proper caching strategies
- Optimize database queries
- Use Next.js Image optimization

### 3. Security
- Never commit secrets to version control
- Validate all user inputs
- Use environment variables for configuration
- Follow principle of least privilege

## Next Steps

After completing this setup guide:

1. Read the [Coding Standards](003-coding-standards.md)
2. Review the [Architecture Overview](../architecture/001-system-overview.md)
3. Check out the [Testing Guide](004-testing-guide.md)
4. Join the development team Slack channel

Welcome to the Threads-Boost development team! 🚀