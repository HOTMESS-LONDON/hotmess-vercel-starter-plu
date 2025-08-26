import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

function timingSafeEqual(a: string, b: string){
  const ba = Buffer.from(a, 'utf8')
  const bb = Buffer.from(b, 'utf8')
  if(ba.length !== bb.length) return false
  return crypto.timingSafeEqual(ba, bb)
}

export async function POST(req: NextRequest){
  try {
    const secret = process.env.SHOPIFY_WEBHOOK_SECRET
    if(!secret) return NextResponse.json({ ok:false, error:'Missing SHOPIFY_WEBHOOK_SECRET' }, { status: 500 })
    const hmac = req.headers.get('x-shopify-hmac-sha256') || ''
    const buf = Buffer.from(await req.arrayBuffer())
    const digest = crypto.createHmac('sha256', secret).update(buf).digest('base64')
    if(!timingSafeEqual(digest, hmac)) return new NextResponse('Unauthorized', { status: 401 })

    const body = JSON.parse(buf.toString('utf8'))
    return NextResponse.json({ ok:true })
  } catch(e:any){
    return NextResponse.json({ ok:false, error:e.message }, { status: 500 })
  }
}
