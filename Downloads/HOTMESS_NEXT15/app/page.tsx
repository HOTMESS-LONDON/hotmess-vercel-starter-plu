import Header from '../components/Header';
import Footer from '../components/Footer';
import UTMLink from '../components/UTMLink';

import ScrollReveal from '../components/ScrollReveal';

export const revalidate = 60;

export default function Page() {
  return (
    <>
      <Header />
      <main style={{padding:'24px 16px',maxWidth:960,margin:'0 auto'}}>
        <ScrollReveal>
          <h1>HOTMESS</h1>
          <p>Fashion. Lube. Radio. Raw Convict Records. QR-driven aftercare.</p>
          <div style={{display:'grid',gap:12,marginTop:16}}>
            <UTMLink href="/radio" utm={{utm_source:'home',utm_medium:'cta'}}>Listen Live</UTMLink>
            <UTMLink href="/drop" utm={{utm_source:'home',utm_medium:'cta'}}>Shop the Drop</UTMLink>
            <UTMLink href="/hand-in-hand" utm={{utm_source:'home',utm_medium:'cta'}}>Hand-in-Hand Sundays</UTMLink>
          </div>
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
