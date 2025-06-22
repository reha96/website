import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Check for authentication token
  const authToken = request.cookies.get('auth-token');
  
  if (authToken && authToken.value === 'authenticated-user') {
    return NextResponse.json({ authenticated: true });
  } else {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
