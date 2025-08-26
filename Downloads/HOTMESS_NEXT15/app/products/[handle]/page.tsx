export default async function ProductPage(
  props: { params: Promise<{ handle: string }> }
) {
  const { handle } = await props.params
  const data = await storefront<any>(QUERY, { handle })
  const p = data?.product

  if (!p) return <div className="card"><h1>Not found</h1></div>

  const variants = p.variants?.edges || []

  return (
    <section className="card">
      <h1>{p.title}</h1>
      <p>{p.description}</p>
      {variants.map((v: any) => (
        <div key={v.node.id}>{v.node.title}</div>
      ))}
    </section>
  )
}