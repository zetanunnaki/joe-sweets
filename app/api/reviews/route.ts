import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug, name, email, rating, title, text } = body;

    if (!slug || !name || !email || !rating || !title || !text) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5.' }, { status: 400 });
    }
    if (text.length < 10) {
      return NextResponse.json({ error: 'Review text is too short.' }, { status: 400 });
    }

    // In a real app, save to a database and send moderation email.
    // For now, we accept and return a success response.
    console.log('[Review submitted]', { slug, name, rating, title });

    return NextResponse.json({ success: true, message: 'Review submitted for moderation.' });
  } catch {
    return NextResponse.json({ error: 'Failed to submit review.' }, { status: 500 });
  }
}
