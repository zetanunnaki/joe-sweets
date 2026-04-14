import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, isRateLimited, recordFailedAttempt, clearAttempts, makeSessionCookie } from '@/lib/admin-auth';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again in 15 minutes.' },
      { status: 429 }
    );
  }

  const { password } = await req.json();

  if (!verifyPassword(password)) {
    recordFailedAttempt(ip);
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  clearAttempts(ip);

  const response = NextResponse.json({ ok: true });
  response.headers.set('Set-Cookie', makeSessionCookie());
  return response;
}
