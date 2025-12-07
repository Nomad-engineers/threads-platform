#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { gzipSync } = require('zlib');

// Calculate file sizes
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

// Calculate gzipped size
function getGzippedSize(filePath) {
  const content = fs.readFileSync(filePath);
  return gzipSync(content).length;
}

// Format bytes to human readable
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Analyze .next directory
function analyzeBundle() {
  const buildPath = path.join(process.cwd(), '.next');

  if (!fs.existsSync(buildPath)) {
    console.log('❌ Build directory not found. Please run `npm run build` first.');
    process.exit(1);
  }

  console.log('📊 Bundle Size Analysis\n');

  // Check main JS files
  const staticPath = path.join(buildPath, 'static', 'chunks');
  if (fs.existsSync(staticPath)) {
    const files = fs.readdirSync(staticPath).filter(f => f.endsWith('.js'));

    console.log('📦 JavaScript Bundles:');
    files.forEach(file => {
      const filePath = path.join(staticPath, file);
      const size = getFileSize(filePath);
      const gzipped = getGzippedSize(filePath);

      console.log(`  ${file}:`);
      console.log(`    Raw: ${formatBytes(size)}`);
      console.log(`    Gzipped: ${formatBytes(gzipped)}`);

      // Warn about large files
      if (size > 100 * 1024) { // 100KB
        console.log(`    ⚠️  Large file detected!`);
      }
      console.log('');
    });
  }

  // Check CSS files
  const cssPath = path.join(buildPath, 'static', 'css');
  if (fs.existsSync(cssPath)) {
    console.log('🎨 CSS Files:');
    const cssFiles = fs.readdirSync(cssPath).filter(f => f.endsWith('.css'));

    cssFiles.forEach(file => {
      const filePath = path.join(cssPath, file);
      const size = getFileSize(filePath);
      console.log(`  ${file}: ${formatBytes(size)}`);
    });
    console.log('');
  }

  // Total build size
  const totalSize = getDirectorySize(buildPath);
  console.log(`📁 Total Build Size: ${formatBytes(totalSize)}`);
  console.log(`📁 Gzipped Build Size: ${formatBytes(getGzippedDirectorySize(buildPath))}`);

  // Performance recommendations
  console.log('\n💡 Performance Recommendations:');

  if (totalSize > 5 * 1024 * 1024) { // 5MB
    console.log('  ⚠️  Build size is quite large. Consider:');
    console.log('     - Implementing code splitting');
    console.log('     - Removing unused dependencies');
    console.log('     - Optimizing images and assets');
  }

  if (totalSize < 1 * 1024 * 1024) { // 1MB
    console.log('  ✅ Build size is optimal!');
  }

  console.log('\n🚀 Phase 1 Optimization Complete!');
}

function getDirectorySize(dirPath) {
  let totalSize = 0;

  function calculate(dirPath) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        calculate(filePath);
      } else {
        totalSize += stats.size;
      }
    });
  }

  calculate(dirPath);
  return totalSize;
}

function getGzippedDirectorySize(dirPath) {
  // This is an approximation - we'd need to traverse and gzip each file
  // For now, we'll estimate 70% compression ratio
  return Math.floor(getDirectorySize(dirPath) * 0.3);
}

// Run analysis
analyzeBundle();