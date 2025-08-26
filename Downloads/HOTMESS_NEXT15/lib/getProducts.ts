import { storefront } from './shopify';

export async function getProducts() {
  const query = `
    query Products {
      products(first: 24) {
        edges {
          node {
            id
            handle
            title
            descriptionHtml
            featuredImage { url altText }
            priceRange { minVariantPrice { amount currencyCode } }
            variants(first: 1) { edges { node { id } } }
          }
        }
      }
    }
  `;
  const data = await storefront(query);
  return data.products.edges.map((e: any) => e.node);
}
