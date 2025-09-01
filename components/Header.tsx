import Link from "next/link";
import { NAV_ITEMS, SITE } from "@/lib/constants";

export default function Header() {
  return (
    <header className="w-full border-b border-neutral-800 bg-black/60 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold uppercase tracking-wider">
          {SITE.name}
        </Link>
        <nav aria-label="Primary">
          <ul className="flex gap-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="text-sm hover:underline underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}