import Link from "next/link";

export default function PromoBanner({title,desc,href}:{title:string;desc:string;href:string}){
  return (
  <Link href={href as any} className="promo">
      <h2>{title}</h2>
      <p>{desc}</p>
    </Link>
  );
}
