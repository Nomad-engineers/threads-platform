// Quick performance report using curl and analysis
const https = require('https');
const http = require('http');

async function runQuickPerfTest() {
  console.log('\n🚀 THREADS PLATFORM - QUICK PERFORMANCE AUDIT\n');
  console.log('=' .repeat(50));

  const startTime = Date.now();

  // Test 1: Page Load Time
  console.log('\n📊 PAGE LOAD METRICS');
  console.log('-' .repeat(30));

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    }
  };

  const req = http.request(options, (res) => {
    let html = '';
    const responseTime = Date.now() - startTime;

    res.on('data', chunk => html += chunk);

    res.on('end', () => {
      console.log(`⏱️  Initial Response: ${responseTime}ms`);
      console.log(`📡 Status Code: ${res.statusCode}`);
      console.log(`🗜️  Content-Encoding: ${res.headers['content-encoding'] || 'None'}`);
      console.log(`💾 Cache-Control: ${res.headers['cache-control'] || 'Not set'}`);

      // Analyze HTML content
      console.log('\n📄 HTML ANALYSIS');
      console.log('-' .repeat(30));
      console.log(`📏 HTML Size: ${(html.length / 1024).toFixed(2)} KB`);

      // Count resources
      const scripts = (html.match(/<script/g) || []).length;
      const styles = (html.match(/<link/g) || []).length;
      const images = (html.match(/<img/g) || []).length;
      const divs = (html.match(/<div/g) || []).length;

      console.log(`📜 Script tags: ${scripts}`);
      console.log(`🎨 Link tags: ${styles}`);
      console.log(`🖼️  Image tags: ${images}`);
      console.log(`📦 Div elements: ${divs}`);

      // Check optimizations
      console.log('\n✅ OPTIMIZATION CHECKS');
      console.log('-' .repeat(30));

      const checks = [
        { name: 'Next.js Data Preloading', pattern: /self\.__next_f/ },
        { name: 'Font Display Swap', pattern: /font-display:\s*swap/ },
        { name: 'Image Optimization', pattern: /data-nimg/ },
        { name: 'React 19 Server Components', pattern: /React.*19/ },
        { name: 'Tailwind CSS', pattern: /tailwindcss/ },
        { name: 'JSON-LD Structured Data', pattern: /application\/ld\+json/ },
        { name: 'Meta Viewport', pattern: /viewport.*width=device-width/ },
        { name: 'SEO Meta Tags', pattern: /<meta.*name="description"/ },
        { name: 'Open Graph Tags', pattern: /property="og:/ }
      ];

      checks.forEach(check => {
        const found = check.pattern.test(html);
        console.log(`${found ? '✅' : '❌'} ${check.name}`);
      });

      // Performance Issues
      console.log('\n⚠️  PERFORMANCE CONCERNS');
      console.log('-' .repeat(30));

      const issues = [];

      if (scripts > 15) {
        issues.push(`Too many scripts: ${scripts} (recommend < 10)`);
      }

      if (html.length > 500 * 1024) {
        issues.push(`Large HTML: ${(html.length / 1024).toFixed(0)}KB (recommend < 500KB)`);
      }

      if (images > 20) {
        issues.push(`Many images: ${images} (consider lazy loading)`);
      }

      if (divs > 500) {
        issues.push(`Complex DOM: ${divs} divs (could impact performance)`);
      }

      if (!/font-display:\s*swap/.test(html)) {
        issues.push('Missing font-display:swap for better loading');
      }

      if (!res.headers['cache-control']) {
        issues.push('No cache headers set');
      }

      if (issues.length === 0) {
        console.log('✅ No major performance issues detected!');
      } else {
        issues.forEach(issue => console.log(`❌ ${issue}`));
      }

      // Recommendations
      console.log('\n💡 QUICK RECOMMENDATIONS');
      console.log('-' .repeat(30));

      console.log('1. 🖼️  Implement Next.js Image component for all images');
      console.log('2. ⚡ Add loading="lazy" to non-critical images');
      console.log('3. 📦 Consider code splitting for large components');
      console.log('4. 🗜️  Enable gzip compression if not already');
      console.log('5. 📊 Add Core Web Vitals monitoring');
      console.log('6. 🎯 Set up performance budgets');
      console.log('7. 📱 Test on real mobile devices');
      console.log('8. 🔍 Run Lighthouse audit regularly');

      // Calculate score
      let score = 100;
      if (scripts > 15) score -= 10;
      if (html.length > 300 * 1024) score -= 10;
      if (responseTime > 1000) score -= 15;
      if (!res.headers['cache-control']) score -= 5;
      if (issues.length > 3) score -= 10;

      console.log('\n🎯 PERFORMANCE SCORE');
      console.log('-' .repeat(30));
      console.log(`Score: ${Math.max(0, score)}/100`);

      if (score >= 90) {
        console.log('🟢 Excellent performance!');
      } else if (score >= 75) {
        console.log('🟡 Good, with room for improvement');
      } else if (score >= 60) {
        console.log('🟠 Needs optimization');
      } else {
        console.log('🔴 Requires immediate attention');
      }

      console.log('\n✨ Quick audit complete!\n');
    });
  });

  req.on('error', (e) => {
    console.error(`❌ Error: ${e.message}`);
    console.log('\nMake sure the dev server is running: npm run dev');
  });

  req.end();
}

// Run the test
runQuickPerfTest().catch(console.error);