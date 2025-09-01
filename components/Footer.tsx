import Link from "next/link";
import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-800 bg-black/80 text-neutral-300">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. Men-only, 18+.</p>
          <nav className="flex gap-4">
            <Link href="/legal">Privacy & Terms</Link>
            <Link href="/accessibility">Accessibility</Link>
            <Link href="/press">Press Room</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}