import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

async function ensureTable(){
  await sql`create table if not exists sms_subscribers (
    id bigserial primary key,
    phone text unique not null,
    status text not null default 'subscribed',
    consent_ts timestamptz not null default now(),
    consent_ip text,
    source text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
  )`;
}

export async function GET(req){
  try{
    const tokenHeader = req.headers.get('x-admin-token') || '';
    const required = process.env.ADMIN_API_TOKEN || '';
    if (required && tokenHeader !== required){
      return NextResponse.json({ ok:false, error:'unauthorized' }, { status: 401 });
    }

    await ensureTable();

    const { searchParams } = new URL(req.url);
    const status = (searchParams.get('status')||'').trim();
    const search = (searchParams.get('search')||'').trim();
    const limit = Math.min(500, Math.max(1, parseInt(searchParams.get('limit')||'50')));
    const offset = Math.max(0, parseInt(searchParams.get('offset')||'0'));

    const statusParam = status || '';
    const searchParam = search || '';

    const totalRes = await sql`select count(*) as c from sms_subscribers where (${statusParam} = '' or status = ${statusParam}) and (${searchParam} = '' or phone ilike ${'%' + searchParam + '%'})`;
    const listRes = await sql`select phone, status, source, consent_ts from sms_subscribers where (${statusParam} = '' or status = ${statusParam}) and (${searchParam} = '' or phone ilike ${'%' + searchParam + '%'}) order by consent_ts desc nulls last limit ${limit} offset ${offset}`;
    const total = parseInt(totalRes.rows?.[0]?.c || '0');

    return NextResponse.json({ ok:true, total, rows: listRes.rows || [] });
  }catch(e){
    return NextResponse.json({ ok:false, error:'server_error' }, { status: 500 });
  }
}

