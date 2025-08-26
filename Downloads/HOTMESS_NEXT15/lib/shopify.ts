export const domain = process.env.SHOPIFY_STORE_DOMAIN as string
export const token = process.env.SHOPIFY_STOREFRONT_TOKEN as string
export const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2024-07'

if(!domain || !token){
  console.warn('[shopify] Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_TOKEN')
}

export async function storefront<T=any>(query: string, variables?: Record<string,any>): Promise<T>{
  const res = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'X-Shopify-Storefront-Access-Token': token
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }
  })
  if(!res.ok){
    const text = await res.text()
    throw new Error(`[shopify] ${res.status} ${text}`)
  }
  const json = await res.json()
  if(json.errors){
    throw new Error('[shopify] ' + JSON.stringify(json.errors))
  }
  return json.data
}
