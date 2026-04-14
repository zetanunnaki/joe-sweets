import { cookies } from 'next/headers';

const COOKIE_NAME = 'joe_admin_session';
const SESSION_VALUE = 'authenticated';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// In-memory rate limiter (resets on server restart — good enough)
const loginAttempts = new Map<string, { count: number; lockedUntil: number }>();

export function verifyPassword(input: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return input === adminPassword;
}

export function isRateLimited(ip: string): boolean {
  const entry = loginAttempts.get(ip);
  if (!entry) return false;
  if (entry.lockedUntil > Date.now()) return true;
  if (entry.lockedUntil && entry.lockedUntil <= Date.now()) {
    loginAttempts.delete(ip);
    return false;
  }
  return false;
}

export function recordFailedAttempt(ip: string): void {
  const entry = loginAttempts.get(ip) ?? { count: 0, lockedUntil: 0 };
  entry.count += 1;
  if (entry.count >= 3) {
    entry.lockedUntil = Date.now() + 15 * 60 * 1000; // 15 min lockout
  }
  loginAttempts.set(ip, entry);
}

export function clearAttempts(ip: string): void {
  loginAttempts.delete(ip);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  return session?.value === SESSION_VALUE;
}

export function makeSessionCookie(): string {
  // Serialize manually since 'cookie' package may vary
  const expires = new Date(Date.now() + MAX_AGE * 1000).toUTCString();
  return `${COOKIE_NAME}=${SESSION_VALUE}; Path=/; HttpOnly; SameSite=Strict; Expires=${expires}`;
}

export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;
}
