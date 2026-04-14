'use client';

import Link from 'next/link';
import { Package, ShoppingBag, Users, MessageSquare } from 'lucide-react';

const iconMap = {
  Package,
  ShoppingBag,
  Users,
  MessageSquare,
} as const;

export type StatIconName = keyof typeof iconMap;

interface StatCardProps {
  label: string;
  value: number;
  iconName: StatIconName;
  href: string;
  color: string;
}

export default function StatCard({ label, value, iconName, href, color }: StatCardProps) {
  const Icon = iconMap[iconName];
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div
        style={{
          backgroundColor: 'var(--color-white)', borderRadius: '12px', padding: '1.25rem',
          boxShadow: '0 2px 12px rgba(44,24,16,0.06)',
          display: 'flex', alignItems: 'center', gap: '1rem',
          transition: 'transform 150ms, box-shadow 150ms',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 20px rgba(44,24,16,0.1)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(44,24,16,0.06)';
        }}
      >
        <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={20} color={color} />
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-secondary)', margin: 0 }}>{value}</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-muted)', margin: 0 }}>{label}</p>
        </div>
      </div>
    </Link>
  );
}
