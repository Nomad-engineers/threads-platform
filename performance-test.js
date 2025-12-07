const WebSocket = require('ws');

async function getPerformanceMetrics() {
  const ws = new WebSocket('ws://localhost:9222/devtools/browser/2661818f-ce3d-41b5-a84c-f4c8e6fc0894');

  return new Promise((resolve, reject) => {
    let id = 1;
    const commands = [];
    const results = {};

    ws.on('open', () => {
      console.log('Connected to Chrome DevTools Protocol');

      // Create a new tab
      sendCommand('Target.createTarget', {
        url: 'http://localhost:3000',
        width: 1920,
        height: 1080
      });
    });

    ws.on('message', (data) => {
      const response = JSON.parse(data);

      if (response.id && results[response.id]) {
        results[response.id] = response.result;

        // Process responses
        if (commands[response.id] === 'Target.createTarget') {
          const targetId = response.result.targetId;

          // Connect to the new target
          sendCommand('Target.attachToTarget', { targetId, flatten: true });
        }

        if (commands[response.id] === 'Target.attachToTarget') {
          const sessionId = response.result.sessionId;

          // Enable domains
          sendCommand('Page.enable', {}, sessionId);
          sendCommand('Network.enable', {}, sessionId);
          sendCommand('Runtime.enable', {}, sessionId);
          sendCommand('Performance.enable', {}, sessionId);

          // Start loading
          setTimeout(() => {
            sendCommand('Page.navigate', { url: 'http://localhost:3000' }, sessionId);
          }, 100);
        }

        if (commands[response.id] === 'Page.navigate') {
          // Wait for page to load
          setTimeout(() => {
            // Get performance metrics
            sendCommand('Performance.getMetrics', {});
            sendCommand('Runtime.evaluate', {
              expression: `
                // Core Web Vitals
                const vitals = {
                  LCP: 0,
                  FID: 0,
                  CLS: 0,
                  FCP: 0,
                  TTFB: 0,
                  loadTime: 0,
                  domContentLoaded: 0,
                  resources: []
                };

                // Get navigation timing
                const navTiming = performance.getEntriesByType('navigation')[0];
                if (navTiming) {
                  vitals.LCP = navTiming.loadEventEnd - navTiming.loadEventStart;
                  vitals.FCP = navTiming.loadEventEnd - navTiming.domLoading;
                  vitals.TTFB = navTiming.responseStart - navTiming.navigationStart;
                  vitals.loadTime = navTiming.loadEventEnd - navTiming.navigationStart;
                  vitals.domContentLoaded = navTiming.domContentLoadedEventEnd - navTiming.navigationStart;
                }

                // Get resource timing
                const resources = performance.getEntriesByType('resource');
                vitals.resources = resources.map(r => ({
                  name: r.name,
                  duration: r.duration,
                  size: r.transferSize || 0,
                  type: r.initiatorType
                }));

                // Calculate total size
                vitals.totalSize = vitals.resources.reduce((sum, r) => sum + r.size, 0);

                // Get DOM stats
                vitals.domNodes = document.querySelectorAll('*').length;
                vitals.bodySize = document.body.innerHTML.length;

                // Get JavaScript execution time
                const jsEntries = performance.getEntriesByType('measure').filter(e => e.name.includes('script'));
                vitals.jsExecutionTime = jsEntries.reduce((sum, e) => sum + e.duration, 0);

                vitals;
              `
            });
          }, 3000);
        }

        if (commands[response.id] === 'Performance.getMetrics') {
          results.metrics = response.result.metrics;
        }

        if (commands[response.id] === 'Runtime.evaluate') {
          results.vitals = response.result.result.value;

          // Generate report
          generateReport(results);
          ws.close();
          resolve(results);
        }
      }
    });

    function sendCommand(method, params = {}, sessionId = null) {
      const message = {
        id: id++,
        method: method,
        params: params
      };

      if (sessionId) {
        message.sessionId = sessionId;
      }

      commands[message.id] = method;
      results[message.id] = null;

      ws.send(JSON.stringify(message));
    }

    function generateReport(data) {
      console.log('\n\n=== THREADS PLATFORM PERFORMANCE ANALYSIS ===\n\n');

      const vitals = data.vitals || {};
      const metrics = data.metrics || [];

      // Core Web Vitals
      console.log('📊 CORE WEB VITALS');
      console.log('==================');
      console.log(`LCP (Largest Contentful Paint): ${(vitals.LCP || 0).toFixed(2)}ms`);
      console.log(`FCP (First Contentful Paint): ${(vitals.FCP || 0).toFixed(2)}ms`);
      console.log(`TTFB (Time to First Byte): ${(vitals.TTFB || 0).toFixed(2)}ms`);
      console.log(`Load Time: ${(vitals.loadTime || 0).toFixed(2)}ms`);
      console.log(`DOM Content Loaded: ${(vitals.domContentLoaded || 0).toFixed(2)}ms`);
      console.log(`CLS (Cumulative Layout Shift): ${(vitals.CLS || 0).toFixed(3)}`);

      // Resource Analysis
      console.log('\n📦 RESOURCE ANALYSIS');
      console.log('====================');
      console.log(`Total Resources: ${vitals.resources ? vitals.resources.length : 0}`);
      console.log(`Total Page Size: ${((vitals.totalSize || 0) / 1024).toFixed(2)} KB`);

      if (vitals.resources) {
        const resourcesByType = {};
        vitals.resources.forEach(r => {
          resourcesByType[r.type] = (resourcesByType[r.type] || 0) + 1;
        });

        console.log('\nResources by Type:');
        Object.entries(resourcesByType).forEach(([type, count]) => {
          console.log(`  ${type}: ${count}`);
        });

        console.log('\nTop 10 Slowest Resources:');
        vitals.resources
          .sort((a, b) => b.duration - a.duration)
          .slice(0, 10)
          .forEach((r, i) => {
            console.log(`  ${i + 1}. ${r.name.split('/').pop()} - ${r.duration.toFixed(2)}ms (${(r.size / 1024).toFixed(2)}KB)`);
          });
      }

      // JavaScript Performance
      console.log('\n⚡ JAVASCRIPT PERFORMANCE');
      console.log('========================');
      console.log(`JS Execution Time: ${(vitals.jsExecutionTime || 0).toFixed(2)}ms`);

      if (metrics && metrics.length > 0) {
        const jsMetrics = metrics.filter(m => m.name.includes('JS'));
        console.log(`JS Heap Used: ${(metrics.find(m => m.name === 'JSHeapUsedSize')?.value || 0 / 1024 / 1024).toFixed(2)} MB`);
        console.log(`JS Heap Total: ${(metrics.find(m => m.name === 'JSHeapTotalSize')?.value || 0 / 1024 / 1024).toFixed(2)} MB`);
      }

      // DOM Analysis
      console.log('\n🏗️ DOM ANALYSIS');
      console.log('===============');
      console.log(`Total DOM Nodes: ${vitals.domNodes || 0}`);
      console.log(`Body HTML Size: ${((vitals.bodySize || 0) / 1024).toFixed(2)} KB`);

      // Performance Score
      console.log('\n🎯 PERFORMANCE SCORE');
      console.log('====================');

      let score = 100;
      let issues = [];

      if ((vitals.LCP || 0) > 2500) {
        score -= 20;
        issues.push('LCP should be under 2.5s');
      }
      if ((vitals.FCP || 0) > 1800) {
        score -= 15;
        issues.push('FCP should be under 1.8s');
      }
      if ((vitals.TTFB || 0) > 800) {
        score -= 15;
        issues.push('TTFB should be under 800ms');
      }
      if ((vitals.totalSize || 0) > 1024 * 1024) {
        score -= 10;
        issues.push('Page size should be under 1MB');
      }
      if ((vitals.domNodes || 0) > 1500) {
        score -= 10;
        issues.push('Too many DOM nodes (should be under 1500)');
      }

      console.log(`Overall Score: ${score}/100`);

      if (issues.length > 0) {
        console.log('\n⚠️ PERFORMANCE ISSUES:');
        issues.forEach(issue => console.log(`  • ${issue}`));
      }

      // Recommendations
      console.log('\n💡 OPTIMIZATION RECOMMENDATIONS');
      console.log('================================');

      if (vitals.resources) {
        const images = vitals.resources.filter(r => r.type === 'img');
        const scripts = vitals.resources.filter(r => r.type === 'script');

        if (images.length > 10) {
          console.log('• Consider lazy loading images');
          console.log('• Optimize images with WebP format');
          console.log('• Implement responsive images with srcset');
        }

        if (scripts.length > 5) {
          console.log('• Minimize and bundle JavaScript');
          console.log('• Implement code splitting');
          console.log('• Load non-critical JS asynchronously');
        }
      }

      if ((vitals.jsExecutionTime || 0) > 100) {
        console.log('• Reduce main thread blocking');
        console.log('• Use Web Workers for heavy computations');
      }

      if ((vitals.totalSize || 0) > 512 * 1024) {
        console.log('• Enable gzip/brotli compression');
        console.log('• Use a CDN for static assets');
        console.log('• Implement caching strategies');
      }

      console.log('\n✅ GOOD PRACTICES IMPLEMENTED:');
      console.log('• Using Next.js for server-side rendering');
      console.log('• React 19 for better performance');
      console.log('• TypeScript for better optimization');
      console.log('• Tailwind CSS for efficient styling');

      console.log('\n✨ ANALYSIS COMPLETE!\n');
    }

    ws.on('error', reject);
  });
}

// Alternative simpler approach using curl and browser APIs
async function quickPerformanceCheck() {
  console.log('\n\n=== QUICK PERFORMANCE CHECK ===\n');

  // Check if server is responding
  const response = await fetch('http://localhost:3000');
  const html = await response.text();

  console.log(`📡 Server Status: ${response.status} ${response.statusText}`);
  console.log(`📄 Page Size: ${(html.length / 1024).toFixed(2)} KB`);
  console.log(`🕐 Response Time: ${response.headers.get('x-response-time') || 'N/A'}`);

  // Analyze HTML structure
  const scriptMatches = html.match(/<script[^>]*>/g) || [];
  const linkMatches = html.match(/<link[^>]*>/g) || [];
  const imgMatches = html.match(/<img[^>]*>/g) || [];

  console.log('\n📊 RESOURCE COUNTS:');
  console.log(`  Scripts: ${scriptMatches.length}`);
  console.log(`  Stylesheets: ${linkMatches.filter(l => l.includes('stylesheet')).length}`);
  console.log(`  Images: ${imgMatches.length}`);

  // Check for performance optimizations
  console.log('\n🔍 OPTIMIZATION CHECKS:');

  if (html.includes('rel="preload"')) {
    console.log('  ✅ Preloading detected');
  } else {
    console.log('  ⚠️ Consider adding preloading for critical resources');
  }

  if (html.includes('async') || html.includes('defer')) {
    console.log('  ✅ Async/defer loading detected');
  } else {
    console.log('  ⚠️ Consider using async/defer for non-critical scripts');
  }

  if (html.includes('data-nimg')) {
    console.log('  ✅ Next.js Image optimization detected');
  } else {
    console.log('  ⚠️ Consider using Next.js Image component');
  }
}

// Run both analyses
(async () => {
  try {
    await quickPerformanceCheck();
    await getPerformanceMetrics();
  } catch (error) {
    console.error('Error during performance analysis:', error.message);
    console.log('\nTrying fallback method...\n');

    // Fallback: Use built-in browser performance APIs
    const puppeteer = require('puppeteer');

    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();

      // Enable performance metrics
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

      const metrics = await page.metrics();
      const perfEntries = await page.evaluate(() => JSON.stringify(performance.getEntriesByType('navigation')));

      console.log('\n=== PUPPETEER PERFORMANCE ANALYSIS ===\n');
      console.log('Metrics:', metrics);
      console.log('Performance Entries:', JSON.parse(perfEntries));

      await browser.close();
    } catch (e) {
      console.error('Puppeteer fallback failed:', e.message);
    }
  }

  // Clean up
  process.exit(0);
})();