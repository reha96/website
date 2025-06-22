import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Create response
  const response = NextResponse.json({ success: true });
  
  // Clear the authentication cookie
  response.cookies.delete('auth-token');
  
  return response;
}
