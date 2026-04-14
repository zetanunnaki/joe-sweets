import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Category } from '@/types';
import { isAdminAuthenticated } from '@/lib/admin-auth';

const filePath = path.join(process.cwd(), 'data', 'categories.json');

function read(): Category[] { return JSON.parse(fs.readFileSync(filePath, 'utf-8')); }
function write(data: Category[]): void { fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); }

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(read());
}

export async function PUT(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body: Category[] = await req.json();
  write(body);
  return NextResponse.json(body);
}
