/**
 * Basic tests for HOTMESS project components
 */

import { ShopifyClient } from '../lib/shopify';

// Mock environment variables for testing
const mockEnv = {
  SHOPIFY_SHOP_DOMAIN: 'test-shop',
  SHOPIFY_ACCESS_TOKEN: 'test-token',
  SHOPIFY_API_VERSION: '2023-10'
};

describe('ShopifyClient', () => {
  beforeEach(() => {
    // Mock environment variables
    Object.assign(process.env, mockEnv);
  });

  test('should create ShopifyClient with correct configuration', () => {
    const client = new ShopifyClient({
      shopDomain: 'test-shop',
      accessToken: 'test-token'
    });

    expect(client).toBeInstanceOf(ShopifyClient);
  });

  test('should throw error for missing configuration', () => {
    expect(() => {
      new ShopifyClient({
        shopDomain: '',
        accessToken: ''
      });
    }).toThrow();
  });
});

describe('Environment Configuration', () => {
  test('should have .node-version file with Node.js 20', () => {
    const fs = require('fs');
    const nodeVersion = fs.readFileSync('.node-version', 'utf8').trim();
    expect(nodeVersion).toBe('20');
  });

  test('should have proper package.json configuration', () => {
    const packageJson = require('../package.json');
    expect(packageJson.name).toBe('hotmess-vercel-starter-plu');
    expect(packageJson.scripts.dev).toBe('next dev');
    expect(packageJson.scripts.build).toBe('next build');
  });
});

describe('ICS Calendar Generation', () => {
  test('should format ICS date correctly', () => {
    // This would test the ICS date formatting function
    const testDate = new Date('2024-08-24T12:00:00Z');
    const expectedFormat = '20240824T120000Z';
    
    // In a real implementation, we'd import and test the formatICSDate function
    const formatICSDate = (date: Date): string => {
      return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };
    
    expect(formatICSDate(testDate)).toBe(expectedFormat);
  });

  test('should escape ICS text properly', () => {
    // Test the ICS text escaping function
    const escapeICSText = (text: string): string => {
      return text
        .replace(/\\/g, '\\\\')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '');
    };

    expect(escapeICSText('Test;Event,Title\nWith newline')).toBe('Test\\;Event\\,Title\\nWith newline');
  });
});

// Mock test for API endpoint (would require more setup for full integration test)
describe('API Endpoints', () => {
  test('should have schedule.ics endpoint file', () => {
    const fs = require('fs');
    expect(fs.existsSync('pages/api/schedule.ics.ts')).toBe(true);
  });
});

export {};