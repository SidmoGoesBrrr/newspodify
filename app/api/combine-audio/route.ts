import { NextResponse } from 'next/server';

const BACKEND_URL = 'http://65.20.81.185:8000/api/combine-audio'; // Your FastAPI backend URL

interface BackendResponse {
  url?: string;
  error?: string;
}

// Type guard function to check if data matches BackendResponse
function isBackendResponse(data: any): data is BackendResponse {
  return typeof data === 'object' && data !== null && ('url' in data || 'error' in data);
}

export async function POST(request: Request) {
  try {
    // Parse the incoming JSON request
    const { filenames, clip_id } = await request.json();

    // Validate the filenames array
    if (!filenames || !Array.isArray(filenames) || filenames.length === 0) {
      return NextResponse.json({ error: 'No filenames provided' }, { status: 400 });
    }

    // Validate clip_id
    if (!clip_id) {
      return NextResponse.json({ error: 'Clip ID not provided' }, { status: 400 });
    }

    // Make a request to the FastAPI backend
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Clip-ID': clip_id  // Send the clip ID as a header
      },
      body: JSON.stringify({ filenames }),
    });

    // Check if the response from FastAPI is OK
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Backend Error Response:', errorData);
      return NextResponse.json({ error: errorData.detail || 'Failed to combine audio files' }, { status: response.status });
    }

    // Parse the response data
    const data = await response.json();

    // Validate the response data
    if (isBackendResponse(data)) {
      if (data.url) {
        return NextResponse.json({ url: data.url });
      } else {
        return NextResponse.json({ error: data.error || 'Unknown error' }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: 'Invalid response from backend' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error combining audio files:', error);
    return NextResponse.json({ error: 'Failed to combine audio files' }, { status: 500 });
  }
}
