'use client';
import Link from 'next/link';
import { buildUTM } from '../lib/buildUTM';

type Props = { href: string; children: React.ReactNode; utm?: Record<string,string> };
export default function UTMLink({ href, children, utm = {} }: Props) {
  const url = Object.keys(utm).length ? buildUTM(href, utm) : href;
  return <Link href={url as any}>{children}</Link>;
}
