import Link from 'next/link'

type ProductCardProps = {
  id: string;
  title: string;
  price: string;
  image: string;
  url: string;
  handle?: string;
  descriptionHtml?: string;
};

export default function ProductCard({ id, title, price, image, url, handle, descriptionHtml }: ProductCardProps) {
  return (
    <article className="card" style={{ display: 'grid', gap: 8 }}>
      {image ? <img src={image} alt={title} /> : null}
      <h3>{title}</h3>
      {descriptionHtml && (
        <div dangerouslySetInnerHTML={{ __html: descriptionHtml.slice(0, 180) }} />
      )}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
        <Link className="btn btn-primary" href={url as any}>View</Link>
        <small>{price}</small>
      </div>
    </article>
  );
}
