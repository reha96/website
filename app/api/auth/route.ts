import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Get credentials from environment variables
    const validUsername = process.env.PRIVATE_USERNAME || "admin";
    const validPassword = process.env.PRIVATE_PASSWORD || "password";

    if (username === validUsername && password === validPassword) {
      // Create response with success
      const response = NextResponse.json({ success: true });
      
      // Set authentication cookie
      response.cookies.set('auth-token', 'authenticated-user', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      });
      
      return response;
    } else {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
