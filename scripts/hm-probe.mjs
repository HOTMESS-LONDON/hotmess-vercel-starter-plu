#!/usr/bin/env node

/**
 * HOTMESS Asset Probe
 * 
 * A script to audit all assets on a deployed site and prevent 404s.
 * Extracts and validates all linked resources (images, CSS, JS, etc.)
 * 
 * Usage: node scripts/hm-probe.mjs <site-url>
 * Example: node scripts/hm-probe.mjs https://hotmess.london
 */

import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class AssetProbe {
  constructor(baseUrl) {
    this.baseUrl = new URL(baseUrl);
    this.checkedUrls = new Set();
    this.errors = [];
    this.stats = {
      total: 0,
      checked: 0,
      errors: 0,
      skipped: 0
    };
  }

  /**
   * Fetch HTML content from the base URL
   */
  async fetchHtml() {
    try {
      console.log(`🌐 Fetching HTML from: ${this.baseUrl}`);
      const response = await fetch(this.baseUrl.toString());
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('text/html')) {
        throw new Error(`Expected HTML, got: ${contentType}`);
      }
      
      return await response.text();
    } catch (error) {
      console.error(`❌ Failed to fetch HTML: ${error.message}`);
      process.exit(1);
    }
  }

  /**
   * Extract asset URLs from HTML content
   */
  extractAssets(html) {
    const assets = new Set();
    
    // Extract img src attributes
    const imgMatches = html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
    for (const match of imgMatches) {
      assets.add({ type: 'image', url: match[1], tag: match[0] });
    }
    
    // Extract link href attributes (CSS, favicon, etc.)
    const linkMatches = html.matchAll(/<link[^>]+href=["']([^"']+)["'][^>]*>/gi);
    for (const match of linkMatches) {
      const linkTag = match[0];
      // Skip non-asset links like canonical, alternate, etc.
      if (linkTag.includes('rel="stylesheet"') || 
          linkTag.includes('rel="icon"') || 
          linkTag.includes('rel="apple-touch-icon"') ||
          linkTag.includes('rel="manifest"')) {
        assets.add({ type: 'stylesheet', url: match[1], tag: match[0] });
      }
    }
    
    // Extract script src attributes
    const scriptMatches = html.matchAll(/<script[^>]+src=["']([^"']+)["'][^>]*>/gi);
    for (const match of scriptMatches) {
      assets.add({ type: 'script', url: match[1], tag: match[0] });
    }
    
    // Extract audio/video source attributes
    const mediaMatches = html.matchAll(/<(?:audio|video)[^>]*>[\s\S]*?<source[^>]+src=["']([^"']+)["'][^>]*>[\s\S]*?<\/(?:audio|video)>/gi);
    for (const match of mediaMatches) {
      assets.add({ type: 'media', url: match[1], tag: match[0] });
    }
    
    // Extract Open Graph and meta tag images
    const ogImageMatches = html.matchAll(/<meta[^>]+(?:property=["']og:image["']|name=["']twitter:image["'])[^>]+content=["']([^"']+)["'][^>]*>/gi);
    for (const match of ogImageMatches) {
      assets.add({ type: 'og-image', url: match[1], tag: match[0] });
    }
    
    // Extract favicon and other icon references
    const iconMatches = html.matchAll(/<link[^>]+rel=["'](?:icon|shortcut icon|apple-touch-icon)["'][^>]+href=["']([^"']+)["'][^>]*>/gi);
    for (const match of iconMatches) {
      assets.add({ type: 'icon', url: match[1], tag: match[0] });
    }
    
    return Array.from(assets);
  }

  /**
   * Resolve relative URLs to absolute URLs
   */
  resolveUrl(assetUrl) {
    try {
      // If it's already absolute, return as-is
      if (assetUrl.startsWith('http://') || assetUrl.startsWith('https://')) {
        return assetUrl;
      }
      
      // If it's protocol-relative, use the base protocol
      if (assetUrl.startsWith('//')) {
        return `${this.baseUrl.protocol}${assetUrl}`;
      }
      
      // If it's relative, resolve against base URL
      return new URL(assetUrl, this.baseUrl).toString();
    } catch (error) {
      console.warn(`⚠️  Invalid URL: ${assetUrl}`);
      return null;
    }
  }

  /**
   * Check if an asset URL is accessible
   */
  async checkAsset(asset) {
    const resolvedUrl = this.resolveUrl(asset.url);
    
    if (!resolvedUrl) {
      this.errors.push({
        type: 'invalid-url',
        asset,
        error: 'Invalid URL format'
      });
      this.stats.errors++;
      return false;
    }
    
    // Skip if already checked
    if (this.checkedUrls.has(resolvedUrl)) {
      this.stats.skipped++;
      return true;
    }
    
    this.checkedUrls.add(resolvedUrl);
    this.stats.checked++;
    
    try {
      console.log(`🔍 Checking ${asset.type}: ${resolvedUrl}`);
      
      const response = await fetch(resolvedUrl, { 
        method: 'HEAD',
        headers: {
          'User-Agent': 'HOTMESS-Asset-Probe/1.0'
        }
      });
      
      if (!response.ok) {
        this.errors.push({
          type: 'http-error',
          asset,
          url: resolvedUrl,
          status: response.status,
          statusText: response.statusText
        });
        this.stats.errors++;
        console.log(`❌ ${response.status}: ${resolvedUrl}`);
        return false;
      }
      
      console.log(`✅ ${response.status}: ${resolvedUrl}`);
      return true;
    } catch (error) {
      this.errors.push({
        type: 'network-error',
        asset,
        url: resolvedUrl,
        error: error.message
      });
      this.stats.errors++;
      console.log(`❌ Network error: ${resolvedUrl} - ${error.message}`);
      return false;
    }
  }

  /**
   * Run the asset probe
   */
  async probe() {
    console.log(`🚀 Starting asset probe for: ${this.baseUrl}`);
    console.log('');
    
    // Fetch and parse HTML
    const html = await this.fetchHtml();
    const assets = this.extractAssets(html);
    
    this.stats.total = assets.length;
    console.log(`📋 Found ${assets.length} assets to check`);
    console.log('');
    
    // Check each asset
    for (const asset of assets) {
      await this.checkAsset(asset);
    }
    
    // Report results
    this.reportResults();
    
    // Exit with error code if there were failures
    if (this.stats.errors > 0) {
      process.exit(1);
    }
  }

  /**
   * Report final results
   */
  reportResults() {
    console.log('');
    console.log('📊 Asset Probe Results');
    console.log('='.repeat(50));
    console.log(`Total assets found: ${this.stats.total}`);
    console.log(`Assets checked: ${this.stats.checked}`);
    console.log(`Assets skipped (duplicates): ${this.stats.skipped}`);
    console.log(`Errors found: ${this.stats.errors}`);
    console.log('');
    
    if (this.errors.length > 0) {
      console.log('❌ Errors:');
      this.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error.type}: ${error.url || error.asset.url}`);
        if (error.status) {
          console.log(`   HTTP ${error.status}: ${error.statusText}`);
        }
        if (error.error) {
          console.log(`   ${error.error}`);
        }
        console.log(`   Asset type: ${error.asset.type}`);
        console.log('');
      });
    } else {
      console.log('✅ All assets are accessible!');
    }
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node scripts/hm-probe.mjs <site-url>');
    console.log('Example: node scripts/hm-probe.mjs https://hotmess.london');
    process.exit(1);
  }
  
  const siteUrl = args[0];
  
  try {
    const probe = new AssetProbe(siteUrl);
    await probe.probe();
  } catch (error) {
    console.error(`💥 Probe failed: ${error.message}`);
    process.exit(1);
  }
}

main().catch(console.error);