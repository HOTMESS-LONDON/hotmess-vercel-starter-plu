import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Page() {
  return (
    <>
      <Header />
      <main style={{padding:'24px 16px',maxWidth:960,margin:'0 auto'}}>
        <h1>Affiliate & Ambassadors</h1>
        <p>Scan-based rewards, QR flows, Telegram bot credits. Join the mess.</p>
      </main>
      <Footer />
    </>
  );
}
