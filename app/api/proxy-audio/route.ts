import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const filename = url.searchParams.get('filename');
    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    const response = await fetch(`http://65.20.81.185/audio_clips/${filename}`, {
      headers: {
        'Content-Type': 'audio/mpeg', // Adjust if needed
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    return new NextResponse(response.body, {
      headers: {
        'Content-Type': 'audio/mpeg', // Adjust if needed
      },
    });
  } catch (error) {
    console.error('Error fetching audio:', error);
    return NextResponse.error();
  }
}
