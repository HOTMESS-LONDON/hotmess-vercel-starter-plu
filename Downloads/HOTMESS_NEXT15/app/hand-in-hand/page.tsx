import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Page() {
  return (
    <>
      <Header />
      <main style={{padding:'24px 16px',maxWidth:960,margin:'0 auto'}}>
        <h1>Hand-in-Hand</h1>
        <p>HNH MESS Sunday — the only place to land. 2–6PM.</p>
      </main>
      <Footer />
    </>
  );
}
