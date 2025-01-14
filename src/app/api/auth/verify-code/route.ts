import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, first_name, last_name, code } = await req.json();
    
    const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'http://auth0.com/oauth/grant-type/passwordless/otp',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        username: email,
        otp: code,
        realm: 'email',
        scope: 'openid profile email',
        state: JSON.stringify({ email, first_name, last_name, code }),
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid verification code');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid verification code' },
      { status: 400 }
    );
  }
}
