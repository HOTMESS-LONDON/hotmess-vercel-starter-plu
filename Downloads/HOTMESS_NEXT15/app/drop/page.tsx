import Header from '../../components/Header';
import Footer from '../../components/Footer';
import UTMLink from '../../components/UTMLink';

export default function Page() {
  return (
    <>
      <Header />
      <main style={{padding:'24px 16px',maxWidth:960,margin:'0 auto'}}>
        <h1>Drop Everything. Pick it up wet.</h1>
        <p>Limited capsules: RAW / HUNG / HIGH / SUPERHUNG / SUPERHIGH.</p>
        <UTMLink href="https://yourshopifydomain.com" utm={{utm_source:'site',utm_campaign:'drop'}}>Go to Shop</UTMLink>
      </main>
      <Footer />
    </>
  );
}
