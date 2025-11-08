# Comprehensive Project Analysis Template

## Overview
This template provides a systematic approach to analyzing any software project, adapted from insights gained analyzing ServerLive's modern Next.js frontend architecture. Use this framework to quickly understand technology stacks, architectural patterns, and code organization across different project types.

---

## Phase 1: Initial Project Context

### 1.1 Project Identification
- **Project Name**: [Extract from package.json, README, or root files]
- **Primary Purpose**: [What does this project do?]
- **Project Type**: [Frontend/Backend/Full-stack/Mobile/Monolith/Microservices]
- **Target Platform**: [Web, Mobile, Desktop, API, CLI, etc.]

### 1.2 Quick Technology Scan
```bash
# Key files to examine first:
- package.json (Node.js projects)
- requirements.txt / pyproject.toml (Python)
- Cargo.toml (Rust)
- pom.xml / build.gradle (Java)
- go.mod (Go)
- Gemfile (Ruby)
- composer.json (PHP)
- csproj / sln (C#/.NET)
```

### 1.3 Framework and Language Detection
- **Primary Language**: [JavaScript/TypeScript/Python/Java/etc.]
- **Main Framework**: [React/Vue/Angular/Next.js/Express/Django/etc.]
- **Version Numbers**: [Critical for understanding capabilities]

---

## Phase 2: Architecture Pattern Analysis

### 2.1 Overall Architecture Style
- **Monolithic vs. Microservices**: [How is the codebase organized?]
- **MVC/MVP/MVVM**: [What presentation patterns are used?]
- **Layered Architecture**: [How are concerns separated?]
- **Design Patterns**: [Factory, Singleton, Observer, etc.]

### 2.2 Frontend Architecture (if applicable)
- **Component Library**: [shadcn/ui, Material-UI, Ant Design, custom?]
- **State Management**: [Redux, Context API, Vuex, Pinia, etc.]
- **Routing**: [Client-side, server-side, hybrid?]
- **Styling Approach**: [CSS-in-JS, Tailwind, SCSS, BEM, etc.]
- **Build System**: [Webpack, Vite, Parcel, esbuild, etc.]

### 2.3 Backend Architecture (if applicable)
- **API Style**: [REST, GraphQL, gRPC, WebSocket]
- **Database Layer**: [ORM, query builder, raw SQL?]
- **Authentication**: [JWT, OAuth, sessions, third-party?]
- **Middleware/Interceptors**: [How are cross-cutting concerns handled?]

---

## Phase 3: Directory Structure Deep Dive

### 3.1 Root Level Organization
```
[Analyze root directory structure]
├── src/ or lib/          # Source code organization
├── public/ or static/    # Static assets
├── tests/ or __tests__/  # Testing structure
├── docs/                 # Documentation
├── config/ or .config/   # Configuration files
└── build/ or dist/       # Build outputs
```

### 3.2 Source Code Organization
- **Feature-based vs. Layer-based**: [How are modules organized?]
- **Module Boundaries**: [How are concerns separated?]
- **Shared Components**: [What's reusable?]
- **Domain Logic**: [How is business logic organized?]

### 3.3 Configuration Files Analysis
```yaml
Build & Deployment:
  - next.config.js, webpack.config.js, vite.config.ts
  - Dockerfile, docker-compose.yml
  - CI/CD files (.github/workflows, .gitlab-ci.yml)

Package Management:
  - package.json, yarn.lock, pnpm-lock.yaml
  - requirements.txt, Pipfile.lock
  - Cargo.lock

Linting & Formatting:
  - .eslintrc, .prettierrc
  - pyproject.toml (black, ruff)
  - .rustfmt.toml

Testing:
  - jest.config.js, vitest.config.ts
  - pytest.ini, tox.ini

Environment:
  - .env.example, .env.local
  - environment-specific configs
```

---

## Phase 4: Code Quality & Best Practices

### 4.1 Code Organization Patterns
- **Naming Conventions**: [PascalCase, camelCase, snake_case, kebab-case?]
- **File Structure**: [Barrels/index files, flat hierarchy, nested?]
- **Import Patterns**: [Absolute vs. relative imports, aliases?]
- **Component/Function Organization**: [Single responsibility, cohesive modules?]

### 4.2 Type Safety & Validation
- **Type System Usage**: [TypeScript, PropTypes, Python typing, Java generics?]
- **Input Validation**: [How is data integrity ensured?]
- **Error Handling**: [try/catch patterns, Result types, error boundaries?]

### 4.3 Testing Strategy
- **Test Types**: [Unit, integration, E2E, visual, performance?]
- **Test Coverage**: [Coverage levels and critical paths]
- **Testing Frameworks**: [Jest, Vitest, Pytest, JUnit, etc.]
- **Mock Strategy**: [How are external dependencies handled?]

---

## Phase 5: Performance & Security Analysis

### 5.1 Performance Optimizations
- **Bundle Optimization**: [Code splitting, tree shaking, lazy loading?]
- **Runtime Performance**: [Memoization, caching strategies?]
- **Database Optimization**: [Indexing, query optimization, connection pooling?]
- **Asset Optimization**: [Image optimization, compression strategies?]

### 5.2 Security Considerations
- **Authentication Flow**: [How is user identity verified?]
- **Authorization Patterns**: [Role-based access control?]
- **Data Validation**: [Input sanitization, SQL injection prevention?]
- **Security Headers**: [CORS, CSP, security middleware?]

### 5.3 SEO & Accessibility (if applicable)
- **Meta Tags**: [OpenGraph, Twitter Cards, structured data?]
- **Accessibility**: [ARIA labels, semantic HTML, color contrast?]
- **Performance Metrics**: [Core Web Vitals, Lighthouse scores?]

---

## Phase 6: Development Workflow & Tooling

### 6.1 Development Experience
- **Hot Reloading**: [Development server capabilities]
- **Debugging Setup**: [Source maps, debugging configurations]
- **Code Generation**: [CLI tools, scaffolding, templates?]
- **Developer Tools**: [Linting, formatting, pre-commit hooks]

### 6.2 Build & Deployment Pipeline
- **Build Process**: [Compilation steps, optimization stages]
- **Environment Management**: [Development, staging, production configs]
- **Deployment Strategy**: [CI/CD pipeline, containerization]
- **Monitoring**: [Error tracking, performance monitoring]

### 6.3 Documentation & Maintenance
- **Code Documentation**: [JSDoc, docstrings, comments]
- **API Documentation**: [OpenAPI/Swagger, Postman collections]
- **README Quality**: [Setup instructions, contribution guidelines]
- **Change Management**: [Changelog, versioning strategy]

---

## Phase 7: Specific Framework Analysis

### 7.1 React/Next.js Projects
```typescript
// Key patterns to identify:
- App Router vs. Pages Router usage
- Server vs. Client Components
- Route Groups and Layout patterns
- Data Fetching Strategies (SWR, React Query, Server Actions)
- State Management (Context, Zustand, Redux)
- Styling Approach (Tailwind, CSS Modules, Styled Components)
```

### 7.2 Backend Framework Projects
```typescript
// Look for:
- Middleware/Interceptor patterns
- Dependency Injection setup
- Database connection management
- API versioning strategies
- Error handling middleware
- Logging and monitoring integration
```

### 7.3 Mobile Projects
```typescript
// Identify:
- Navigation patterns (Stack, Tab, Drawer)
- State Management (Redux, MobX, Provider)
- Platform-specific code handling
- Build configurations (Android/iOS)
- Performance optimization techniques
```

---

## Phase 8: Integration & Ecosystem

### 8.1 Third-Party Dependencies
- **Core Dependencies**: [Essential libraries the project depends on]
- **Development Dependencies**: [Build and development tools]
- **Integration Patterns**: [How are external services integrated?]
- **Vendor Lock-in**: [Critical dependencies that would be hard to replace]

### 8.2 API & Service Integration
- **External APIs**: [Third-party services being used]
- **Authentication Methods**: [OAuth, API keys, webhooks]
- **Data Flow**: [How does data move between services?]
- **Error Handling**: [How are external failures handled?]

---

## Phase 9: Scalability & Maintainability

### 9.1 Scalability Patterns
- **Horizontal Scaling**: [Can the application scale across multiple instances?]
- **Vertical Scaling**: [Resource utilization patterns]
- **Database Scaling**: [Sharding, replication, caching strategies]
- **API Rate Limiting**: [How is traffic managed?]

### 9.2 Maintainability Factors
- **Code Modularity**: [How easy is it to modify individual components?]
- **Technical Debt**: [Areas that need refactoring or modernization]
- **Test Coverage**: [How well is the codebase tested?]
- **Documentation Quality**: [Is knowledge transfer easy?]

---

## Analysis Output Template

### Executive Summary
- **Project Overview**: [2-3 sentence summary]
- **Technology Stack**: [Key technologies and versions]
- **Architecture Style**: [Main architectural patterns]
- **Complexity Assessment**: [Simple/Moderate/Complex]
- **Key Strengths**: [What's done well]
- **Areas for Improvement**: [What needs attention]

### Detailed Findings
- **Architecture Score**: [1-10 rating with justification]
- **Code Quality Assessment**: [Patterns, anti-patterns, recommendations]
- **Security Posture**: [Vulnerabilities, best practices, recommendations]
- **Performance Profile**: [Bottlenecks, optimization opportunities]
- **Maintainability Index**: [How easy to maintain and extend]

### Actionable Recommendations
- **High Priority**: [Critical issues needing immediate attention]
- **Medium Priority**: [Important improvements for near future]
- **Low Priority**: [Nice-to-have enhancements]
- **Migration Path**: [If modernization is needed]

---

## Usage Instructions

1. **Start with Phase 1** to understand the project context
2. **Follow phases sequentially** but adjust depth based on project complexity
3. **Use the file path examples** to locate specific files and patterns
4. **Adapt the template** for the specific project type you're analyzing
5. **Focus on actionable insights** rather than just cataloging technologies

## Quick Reference Checklist

- [ ] Technology stack identified and versioned
- [ ] Architecture patterns documented
- [ ] Directory structure mapped
- [ ] Code quality issues identified
- [ ] Security vulnerabilities noted
- [ ] Performance bottlenecks found
- [ ] Scalability limitations assessed
- [ ] Maintenance recommendations provided

---

## Adaptation Examples

### For Legacy Projects
Focus on:
- Modernization opportunities
- Technical debt assessment
- Migration strategies
- Risk analysis

### For New Projects
Focus on:
- Best practices implementation
- Architecture validation
- Scalability planning
- Development workflow optimization

### For Enterprise Projects
Focus on:
- Integration patterns
- Compliance and security
- Team collaboration
- Documentation standards

This template provides a comprehensive foundation for project analysis while remaining flexible enough to adapt to different contexts and requirements.