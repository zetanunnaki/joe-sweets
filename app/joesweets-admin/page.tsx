'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (res.ok) {
        router.push('/joesweets-admin/dashboard');
      } else {
        setError(data.error || 'Login failed.');
        setPassword('');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <meta name="robots" content="noindex" />
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}>
        <div style={{
          backgroundColor: 'var(--color-white)',
          borderRadius: '16px',
          padding: '2.5rem',
          width: '100%',
          maxWidth: '380px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '14px',
              backgroundColor: 'var(--color-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1rem',
            }}>
              <Lock size={24} color="white" />
            </div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--color-secondary)', margin: '0 0 0.25rem' }}>
              Joe Sweets
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-muted)', margin: 0 }}>
              Admin Dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-secondary)', fontFamily: 'var(--font-body)' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                  placeholder="Enter admin password"
                  style={{
                    width: '100%',
                    padding: '0.625rem 2.75rem 0.625rem 0.875rem',
                    borderRadius: '8px',
                    border: `2px solid ${error ? 'var(--color-accent)' : '#e2d9cf'}`,
                    backgroundColor: 'var(--color-white)',
                    color: 'var(--color-secondary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '0.75rem', top: '50%',
                    transform: 'translateY(-50%)', background: 'none',
                    border: 'none', cursor: 'pointer', color: 'var(--color-muted)',
                    display: 'flex', alignItems: 'center',
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {error && (
                <p style={{ color: 'var(--color-accent)', fontSize: '0.8rem', margin: 0 }}>{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              style={{
                padding: '0.875rem',
                backgroundColor: loading || !password ? '#d4a96a' : 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: loading || !password ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'background 200ms',
              }}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
