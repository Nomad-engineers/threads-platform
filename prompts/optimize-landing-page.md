# Landing Page Optimization Master Prompt

## Primary Objective

Transform your landing page into a high-converting, SEO-optimized, lightning-fast, and visually stunning experience that maximizes business results and user engagement.

## Quick Start Commands

```bash
# Start the complete optimization workflow
/optimize-landing-page

# Quick CTA analysis and improvement
/cta-analyze

# Design critique and recommendations
/design-critique

# Generate new optimized landing page
/generate-landing-page [industry] [goal]
```

*Note: These commands are defined in `.claude/commands/` directory*

---

## Phase 1: Comprehensive Analysis (Multi-Agent Approach)

### 1.1 Initial Assessment

**Execute this sequence in parallel:**

1. **Landing Page Agent Activation**
   ```bash
   skill: "landing-page-framework"
   ```
   - Analyze current landing page structure
   - Identify conversion bottlenecks
   - Map user journey friction points
   - Evaluate value proposition clarity

2. **SEO Expert Analysis**
   ```bash
   skill: "seo-expert"
   ```
   - Perform comprehensive SEO audit
   - Analyze keyword targeting
   - Check technical SEO foundations
   - Evaluate content optimization

3. **Performance Analysis with Chrome DevTools**
   ```bash
   # Take performance snapshot
   mcp chrome-devtools performance_start_trace reload=true autoStop=true

   # Analyze Core Web Vitals
   mcp chrome-devtools take_snapshot verbose=true

   # Run Lighthouse audit
   ```

### 1.2 Data Collection

**Use sequential thinking for strategic analysis:**
```bash
mcp sequential-thinking sequentialthinking
```

Analyze:
- Current conversion rates and drop-off points
- User behavior patterns (if analytics available)
- Competitor landscape (use WebSearch)
- Technical performance metrics

---

## Phase 2: Strategic Planning (Planner-Manager)

### 2.1 Create Optimization Roadmap

```markdown
## Optimization Strategy Document

### Priority Matrix:
1. **Critical Fixes** (Impact: High, Effort: Low)
   - [ ] Fix broken elements
   - [ ] Optimize above-the-fold content
   - [ ] Improve page load speed

2. **Quick Wins** (Impact: High, Effort: Medium)
   - [ ] A/B test CTA variations
   - [ ] Optimize headlines
   - [ ] Add social proof

3. **Major Enhancements** (Impact: Very High, Effort: High)
   - [ ] Redesign mobile experience
   - [ ] Implement personalization
   - [ ] Add interactive elements
```

### 2.2 Set Measurable Goals

Define specific KPIs:
- Conversion rate improvement: Target ______%
- Page speed: Target <______ seconds load time
- SEO ranking: Target top ______ for ______ keywords
- User engagement: Target ______% bounce rate reduction

---

## Phase 3: Implementation (Senior Next.js Agent)

### 3.1 Technical Optimization

**Get latest Next.js best practices:**
```bash
mcp context7 resolve-library-id "next.js"
mcp context7 get-library-docs context7CompatibleLibraryID="/vercel/next.js" topic="performance"
```

**Core Optimizations:**

1. **Performance Enhancements**
   ```typescript
   // Implement dynamic imports
   const LazyComponent = dynamic(() => import('./Component'), {
     loading: () => <Skeleton />,
     ssr: false
   })

   // Optimize images
   import Image from 'next/image'

   // Implement prefetching
   <Link href="/pricing" prefetch={true}>
   ```

2. **SEO Implementation**
   ```typescript
   // app/page.tsx
   export const metadata: Metadata = {
     title: 'Your Primary Keyword - Brand Name',
     description: 'Compelling meta description with keywords',
     openGraph: { ... },
     alternates: { canonical: 'https://yourdomain.com' }
   }
   ```

3. **Shadcn/ui Components Integration**
   ```bash
   # Get modern UI components
   mcp shadcn search_items_in_registries registries='["@shadcn"]' query="hero section"
   mcp shadcn get_item_examples_from_registries registries='["@shadcn"]' query="landing page hero"
   ```

### 3.2 Content & Copy Optimization

**Use SEO Expert skill for content:**
```bash
skill: "seo-expert"
```

Optimize:
- Headlines (H1, H2, H3 hierarchy)
- Value proposition statements
- CTA button text and placement
- Social proof elements

### 3.3 Design System Implementation

**Frontend Design skill activation:**
```bash
skill: "frontend-design"
```

Create/design:
- Modern hero section with animations
- Trust indicators and badges
- Pricing tables (if applicable)
- Testimonial carousel
- Feature comparison grid

---

## Phase 4: Advanced Features Implementation

### 4.1 Interactive Elements

```typescript
// Implement with modern React patterns
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Animated counters
// Interactive demos
// Dynamic pricing calculator
```

### 4.2 CTA Optimization

**Run CTA analysis command:**
```bash
/cta-analyze
```

Implement:
- Multiple CTA variations for testing
- Sticky CTAs on scroll
- Exit-intent popups
- Progress indicators for forms

### 4.3 Analytics & Tracking

```typescript
// Implement tracking
import { sendGAEvent } from '@next/third-parties/google'

// Track conversions
const trackConversion = (event: string) => {
  sendGAEvent('event', event, { ... })
}
```

---

## Phase 5: Testing & Validation

### 5.1 Cross-Browser Testing

```bash
# Open in Chrome DevTools for testing
mcp chrome-devtools new_page url="http://localhost:3000"

# Test different viewports
mcp chrome-devtools resize_page width=375 height=667  # Mobile
mcp chrome-devtools resize_page width=1920 height=1080  # Desktop

# Take screenshots for documentation
mcp chrome-devtools take_screenshot fullPage=true filePath="./screenshots/optimized-landing.png"
```

### 5.2 Performance Validation

```bash
# Stop trace and analyze
mcp chrome-devtools performance_stop_trace

# Get detailed insights
mcp chrome-devtools performance_analyze_insight insightSetId="latest" insightName="LCPBreakdown"
```

### 5.3 SEO Validation

**Run SEO expert audit:**
```bash
skill: "seo-expert"
```

Verify:
- Meta tags optimization
- Schema markup
- Internal linking
- Mobile-friendliness

---

## Phase 6: Launch & Monitor

### 6.1 Deployment Checklist

```markdown
- [ ] Performance budgets met
- [ ] All breakpoints tested
- [ ] Forms functional
- [ ] Analytics tracking active
- [ ] SEO tags verified
- [ ] Accessibility compliant (WCAG 2.1)
- [ ] Browser compatibility checked
```

### 6.2 Post-Launch Monitoring

Set up monitoring for:
1. **Core Web Vitals** via Chrome DevTools
2. **Conversion events** via analytics
3. **SEO rankings** via search console
4. **User session recordings** (if available)

---

## Success Metrics Dashboard

### Create this tracking system:

```typescript
// lib/tracking.ts
export const landingPageMetrics = {
  conversions: {
    primary: 'Sign-ups',
    secondary: 'Demo requests'
  },
  performance: {
    lcp: '< 2.5s',
    fid: '< 100ms',
    cls: '< 0.1'
  },
  engagement: {
    bounceRate: '< 40%',
    timeOnPage: '> 2min',
    scrollDepth: '> 70%'
  },
  seo: {
    organicTraffic: '+30%',
    keywordRankings: 'Top 10',
    backlinks: 'Quality domains'
  }
}
```

---

## Continuous Optimization Loop

### Weekly Tasks:
1. Analyze performance data
2. Run A/B test on one element
3. Update content based on user feedback
4. Check and fix any technical issues
5. Competitor analysis update

### Monthly Tasks:
1. Full performance audit
2. SEO ranking review
3. User behavior analysis
4. Design refresh consideration
5. Conversion funnel optimization

---

## Emergency Quick Fixes

**If conversion drops suddenly:**

1. Check with Chrome DevTools
   ```bash
   mcp chrome-devtools take_snapshot
   mcp chrome-devtools list_network_requests
   ```

2. Run design critique
   ```bash
   /design-critique
   ```

3. Activate Landing Page Agent
   ```bash
   skill: "landing-page-framework"
   ```

---

## Deliverables Package

Upon completion, provide:

1. **Optimized Landing Page Code**
   - Fully responsive Next.js implementation
   - Shadcn/ui components
   - Performance optimizations

2. **Performance Report**
   - Core Web Vitals scores
   - Load time improvements
   - Optimization techniques used

3. **SEO Audit Report**
   - Keyword rankings
   - Technical SEO fixes
   - Content optimization summary

4. **Conversion Optimization Plan**
   - A/B test hypotheses
   - CTA variations
   - User journey improvements

5. **Documentation**
   - Implementation guide
   - Maintenance checklist
   - Monitoring dashboard setup

---

## Pro Tips for Maximum Results

1. **Always test on real devices** - Emulators aren't enough
2. **Focus on the first 3 seconds** - Most users decide in that time
3. **Use authentic social proof** - Real testimonials outperform stock text
4. **Optimize for intent** - Match user expectations at each stage
5. **Keep it simple** - Every element should have a purpose
6. **Use progressive enhancement** - Core functionality works without JavaScript
7. **Implement smart loading** - Load above-the-fold first
8. **Use semantic HTML** - Better for SEO and accessibility

---

## Final Optimization Command

```bash
# Run this for complete optimization
/optimize-landing-page --analyze --implement --test --monitor
```

This comprehensive prompt orchestrates all your available tools and agents to systematically optimize your landing page for maximum performance across all critical metrics.