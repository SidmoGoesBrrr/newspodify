import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://65.20.81.185:3000/api/get-filenames', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching filenames:', error);
    return NextResponse.error();
  }
}
