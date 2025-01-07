process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { NextResponse } from 'next/server';


export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log('PostQuery Data:', data);

        const apiUrl = process.env.POSTCOMMAND_API_URL;
        if (!apiUrl) {
            return NextResponse.json(
                { error: 'Backend API URL is not configured' },
                { status: 500 }
            );
        }

        const backendResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!backendResponse.ok) {
            const errorText = await backendResponse.text();
            return NextResponse.json(
                { error: 'Failed to send data to backend', details: errorText },
                { status: backendResponse.status }
            );
        }

        const responseBody = await backendResponse.json();
        return NextResponse.json(
            { message: 'PostQuery forwarded successfully', backendResponse: responseBody },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error in PostQuery handler:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    }
}

