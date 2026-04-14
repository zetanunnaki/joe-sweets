import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Inquiry } from '@/types';

const inquiriesPath = path.join(process.cwd(), 'data', 'inquiries.json');

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name?.trim() || !email?.includes('@') || !message?.trim()) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
    }

    const raw = fs.readFileSync(inquiriesPath, 'utf-8');
    const inquiries: Inquiry[] = JSON.parse(raw);

    const inquiry: Inquiry = {
      id: `INQ-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      subject: subject?.trim() || 'General Inquiry',
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    inquiries.push(inquiry);
    fs.writeFileSync(inquiriesPath, JSON.stringify(inquiries, null, 2));

    return NextResponse.json({ message: "Message received! We'll get back to you within 24 hours." });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
