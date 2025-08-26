import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Page() {
  return (
    <>
      <Header />
      <main style={{padding:'24px 16px',maxWidth:960,margin:'0 auto'}}>
        <h1>Rooms</h1>
        <p>Telegram rooms for drops, radio, and aftercare. Invite-only links live here.</p>
      </main>
      <Footer />
    </>
  );
}
