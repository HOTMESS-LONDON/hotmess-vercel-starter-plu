import ScrollReveal from '../../components/ScrollReveal';
export default function Page(){
  return (
    <main className="container">
      <ScrollReveal>
        <h1>Care Hub</h1>
        <p>No judgement, real resources. Testing info, ride-home codes, and support links.</p>
        <ul>
          <li><a className="btn btn-ghost" href="https://www.nhs.uk/service-search/sexual-health">NHS Sexual Health Services</a></li>
          <li><a className="btn btn-ghost" href="https://www.stopaids.org">Support & Info</a></li>
        </ul>
      </ScrollReveal>
    </main>
  )
}
