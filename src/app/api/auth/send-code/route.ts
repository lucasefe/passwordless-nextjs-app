import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { first_name, last_name, email } = await req.json();
    
    // Call Auth0 Management API to trigger passwordless email
    const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/passwordless/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        connection: 'email',
        email,
        send: 'code',
        authParams: {
          state: JSON.stringify({ first_name, last_name})
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send verification code');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send verification code' },
      { status: 500 }
    );
  }
}
