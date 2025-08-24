/**
 * Shopify API client with enhanced resilience
 * Features: 2-second timeout, single retry on failure
 */

interface ShopifyFetchOptions {
  timeout?: number;
  retries?: number;
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

interface ShopifyConfig {
  shopDomain: string;
  accessToken: string;
  apiVersion?: string;
}

class ShopifyError extends Error {
  constructor(message: string, public status?: number, public response?: Response) {
    super(message);
    this.name = 'ShopifyError';
  }
}

export class ShopifyClient {
  private config: ShopifyConfig;
  private defaultTimeout = 2000; // 2 seconds
  private defaultRetries = 1; // Single retry

  constructor(config: ShopifyConfig) {
    this.config = {
      apiVersion: '2023-10',
      ...config
    };
  }

  /**
   * Resilient fetch with timeout and retry logic
   */
  async fetch<T = any>(
    endpoint: string, 
    options: ShopifyFetchOptions = {}
  ): Promise<T> {
    const {
      timeout = this.defaultTimeout,
      retries = this.defaultRetries,
      method = 'GET',
      headers = {},
      body
    } = options;

    const url = `https://${this.config.shopDomain}.myshopify.com/admin/api/${this.config.apiVersion}${endpoint}`;
    
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.config.accessToken,
        ...headers
      },
      body
    };

    let lastError: Error;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new ShopifyError(
            `Shopify API error: ${response.status} ${response.statusText}`,
            response.status,
            response
          );
        }

        const data = await response.json();
        return data;

      } catch (error) {
        lastError = error as Error;
        
        // Don't retry on authentication errors or client errors (4xx)
        if (error instanceof ShopifyError && error.status && error.status >= 400 && error.status < 500) {
          throw error;
        }

        // If this was the last attempt, throw the error
        if (attempt === retries) {
          throw new ShopifyError(
            `Shopify fetch failed after ${retries + 1} attempts: ${lastError.message}`,
            undefined,
            undefined
          );
        }

        // Wait before retry (exponential backoff could be added here)
        await new Promise(resolve => setTimeout(resolve, 500 * (attempt + 1)));
      }
    }

    throw lastError!;
  }

  /**
   * Get products from Shopify
   */
  async getProducts(limit = 50): Promise<any> {
    return this.fetch(`/products.json?limit=${limit}`);
  }

  /**
   * Get orders from Shopify
   */
  async getOrders(limit = 50): Promise<any> {
    return this.fetch(`/orders.json?limit=${limit}`);
  }

  /**
   * Get inventory levels
   */
  async getInventory(): Promise<any> {
    return this.fetch('/inventory_levels.json');
  }
}

/**
 * Factory function to create a Shopify client from environment variables
 */
export function createShopifyClient(): ShopifyClient {
  const shopDomain = process.env.SHOPIFY_SHOP_DOMAIN;
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;
  const apiVersion = process.env.SHOPIFY_API_VERSION;

  if (!shopDomain || !accessToken) {
    throw new Error('SHOPIFY_SHOP_DOMAIN and SHOPIFY_ACCESS_TOKEN environment variables are required');
  }

  return new ShopifyClient({
    shopDomain,
    accessToken,
    apiVersion
  });
}

export default ShopifyClient;