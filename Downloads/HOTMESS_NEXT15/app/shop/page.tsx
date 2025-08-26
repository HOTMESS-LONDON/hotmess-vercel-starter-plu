import ProductCard from "../../components/ProductCard";
import Carousel from "../../components/Carousel";
import PromoBanner from "../../components/PromoBanner";
import StingerCard from "../../components/StingerCard";
import { getProducts } from "../../lib/getProducts";

export default async function ShopPage() {
  const products = await getProducts();
  // Example: treat first 2 as bundles, rest as products
  const bundles = products.slice(0, 2);
  const rest = products.slice(2);
  return (
    <main className="container">
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 48, margin: "12px 0" }}>DROP EVERYTHING.</h1>
      <p>Suit up. Tune in. Filth never looked this good.</p>

      <Carousel>
        {bundles.map((b: any) => (
          <ProductCard
            key={b.id}
            id={b.id}
            title={b.title}
            price={`${b.priceRange?.minVariantPrice?.amount} ${b.priceRange?.minVariantPrice?.currencyCode}`}
            image={b.featuredImage?.url}
            url={`/products/${b.handle}`}
            handle={b.handle}
            descriptionHtml={b.descriptionHtml}
          />
        ))}
      </Carousel>

      <PromoBanner
        title="Tune In: Dial-a-Daddy"
        desc="Bruno live Mon/Wed/Fri 3PM. Shop dirty, listen filth."
        href="/radio"
      />

      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", marginTop: 32 }}>
        {rest.map((p: any) => (
          <ProductCard
            key={p.id}
            id={p.id}
            title={p.title}
            price={`${p.priceRange?.minVariantPrice?.amount} ${p.priceRange?.minVariantPrice?.currencyCode}`}
            image={p.featuredImage?.url}
            url={`/products/${p.handle}`}
            handle={p.handle}
            descriptionHtml={p.descriptionHtml}
          />
        ))}
      </div>

      <PromoBanner
        title="Hand-in-Hand"
        desc="Sunday 2–6PM. Care + beats. Sponsored by HNH MESS."
        href="/radio"
      />

      <Carousel>
        <StingerCard title="Hand-in-Hand Stinger" file="/audio/SW_Hand-in-Hand.mp3" />
        <StingerCard title="Dial-a-Daddy Teaser" file="/audio/T_Dial-a-Daddy.mp3" />
      </Carousel>
    </main>
  );
}
