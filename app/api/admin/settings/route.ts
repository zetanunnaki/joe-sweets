import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { isAdminAuthenticated } from '@/lib/admin-auth';

const filePath = path.join(process.cwd(), 'data', 'site.json');

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(JSON.parse(fs.readFileSync(filePath, 'utf-8')));
}

export async function PUT(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  fs.writeFileSync(filePath, JSON.stringify(body, null, 2));
  return NextResponse.json(body);
}
