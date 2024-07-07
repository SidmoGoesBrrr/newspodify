import { NextRequest, NextResponse } from 'next/server';
import getConfig from 'next/config';


export async function POST(request: NextRequest) {
    try{
        
        const body = await request.json();
        console.log(body);
        return NextResponse.json({ message: 'Email sent successfully', body });
    }
    catch (error) {
        console.error('Failed to send email:', error);
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
    
        return NextResponse.json({ error: errorMessage }, { status: 500 });
      }
}
      
      