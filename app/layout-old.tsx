export const metadata = { title: "HOTMESS Radio", description: "UK’s unapologetic queer 24/7 stream." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{margin:0,background:"#0B0B0B",color:"#fff",fontFamily:"system-ui"}}>
        <main style={{maxWidth:960,margin:"64px auto",padding:"0 20px"}}>{children}</main>
      </body>
    </html>
  );
}
