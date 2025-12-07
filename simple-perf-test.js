// Simple performance test without dependencies
const http = require('http');
const https = require('https');

async function checkPerformance() {
  console.log('\n\n=== THREADS PLATFORM PERFORMANCE ANALYSIS ===\n\n');

  // Check the page
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET'
  };

  const startTime = Date.now();

  const req = http.request(options, (res) => {
    let data = '';
    const headers = res.headers;

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      const loadTime = Date.now() - startTime;

      // Core Metrics
      console.log('📊 CORE PERFORMANCE METRICS');
      console.log('============================');
      console.log(`⏱️ Page Load Time: ${loadTime}ms`);
      console.log(`📡 HTTP Status: ${res.statusCode} ${res.httpVersion}`);
      console.log(`📄 Page Size: ${(data.length / 1024).toFixed(2)} KB`);
      console.log(`🗜️ Gzipped: ${headers['content-encoding'] || 'None'}`);
      console.log(`💾 Cache Control: ${headers['cache-control'] || 'None'}`);

      // Resource Analysis
      console.log('\n📦 RESOURCE ANALYSIS');
      console.log('====================');

      const scripts = (data.match(/<script[^>]*src="([^"]*)"[^>]*>/g) || []).length;
      const stylesheets = (data.match(/<link[^>]*rel="stylesheet"[^>]*>/g) || []).length;
      const images = (data.match(/<img[^>]*>/g) || []).length;
      const fonts = (data.match(/@font-face|\.woff|\.ttf/g) || []).length;

      console.log(`📜 JavaScript Files: ${scripts}`);
      console.log(`🎨 CSS Files: ${stylesheets}`);
      console.log(`🖼️ Images: ${images}`);
      console.log(`🔤 Fonts: ${fonts}`);

      // Next.js Optimizations
      console.log('\n✅ NEXT.JS OPTIMIZATIONS DETECTED');
      console.log('===================================');

      const checks = [
        { pattern: /data-nimg/, desc: 'Next.js Image optimization' },
        { pattern: /id="__next"/, desc: 'Next.js app structure' },
        { pattern: /next-head/, desc: 'Next.js Head component' },
        { pattern: /self\.__next_f/, desc: 'Next.js data fetching' },
        { pattern: /rel="preload"/, desc: 'Resource preloading' },
        { pattern: /nonce="/, desc: 'Security nonce' },
        { pattern: /<script.*>/, desc: 'JavaScript bundling' },
        { pattern: /tailwindcss/, desc: 'Tailwind CSS' }
      ];

      checks.forEach(check => {
        if (check.pattern.test(data)) {
          console.log(`  ✅ ${check.desc}`);
        } else {
          console.log(`  ⚠️ ${check.desc} - Not detected`);
        }
      });

      // Performance Issues Check
      console.log('\n⚠️ POTENTIAL PERFORMANCE ISSUES');
      console.log('==============================');

      const issues = [];
      const recommendations = [];

      if (data.length > 1024 * 500) {
        issues.push('Large HTML size (>500KB)');
        recommendations.push('Consider implementing code splitting');
      }

      if (scripts > 10) {
        issues.push('Many JavaScript files');
        recommendations.push('Bundle and minify JavaScript');
      }

      if (images > 20) {
        issues.push('Many images');
        recommendations.push('Implement lazy loading and optimization');
      }

      if (!headers['cache-control']) {
        issues.push('No cache headers');
        recommendations.push('Set appropriate cache-control headers');
      }

      if (issues.length > 0) {
        issues.forEach(issue => console.log(`  • ${issue}`));
      } else {
        console.log('  ✅ No major issues detected');
      }

      // Recommendations
      if (recommendations.length > 0) {
        console.log('\n💡 OPTIMIZATION RECOMMENDATIONS');
        console.log('================================');
        recommendations.forEach(rec => console.log(`• ${rec}`));
      }

      // Core Web Vitals Estimation
      console.log('\n📈 CORE WEB VITALS ESTIMATION');
      console.log('==============================');

      // Estimate LCP based on content and load time
      const lcpEstimate = loadTime * 0.7;
      console.log(`🎯 Estimated LCP: ${lcpEstimate.toFixed(0)}ms`);

      if (lcpEstimate < 2500) {
        console.log('  ✅ Good (under 2.5s)');
      } else if (lcpEstimate < 4000) {
        console.log('  ⚠️ Needs improvement (2.5-4s)');
      } else {
        console.log('  ❌ Poor (over 4s)');
      }

      // Performance Score
      let score = 100;
      if (loadTime > 1000) score -= 10;
      if (loadTime > 2000) score -= 15;
      if (data.length > 1024 * 300) score -= 10;
      if (scripts > 8) score -= 5;
      if (!headers['cache-control']) score -= 5;

      console.log('\n🎯 PERFORMANCE SCORE');
      console.log('====================');
      console.log(`Overall Score: ${score}/100`);

      if (score >= 90) {
        console.log('🟢 Excellent performance');
      } else if (score >= 75) {
        console.log('🟡 Good performance');
      } else if (score >= 60) {
        console.log('🟠 Needs improvement');
      } else {
        console.log('🔴 Poor performance');
      }

      console.log('\n✨ ANALYSIS COMPLETE! ✨\n');
    });
  });

  req.on('error', (e) => {
    console.error(`Error: ${e.message}`);
  });

  req.end();
}

// Also check the specific routes
async function checkRoutes() {
  console.log('🛣️ ROUTE PERFORMANCE CHECK');
  console.log('=========================\n');

  const routes = [
    { path: '/', name: 'Home' },
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/auth', name: 'Auth' }
  ];

  for (const route of routes) {
    const startTime = Date.now();
    try {
      const response = await fetch(`http://localhost:3000${route.path}`);
      const loadTime = Date.now() - startTime;
      console.log(`${route.name.padEnd(12)}: ${response.status} (${loadTime}ms)`);
    } catch (e) {
      console.log(`${route.name.padEnd(12)}: Error - ${e.message}`);
    }
  }
}

// Run checks
(async () => {
  await checkPerformance();
  await checkRoutes();
})();