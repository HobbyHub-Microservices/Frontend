process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log('PostQuery Data Received:', JSON.stringify(data, null, 2));

        // Validate required fields
        const { title, content, userName, hobbyName, createdAt, imageUrls } = data;

        if (!title || !content || !userName || !hobbyName || !createdAt) {
            console.error('Missing required fields:', data);
            return NextResponse.json(
                { error: 'Missing required fields', data },
                { status: 400 }
            );
        }

        const apiUrl = process.env.NEXT_PUBLIC_POSTQUERY_API_URL;
        if (!apiUrl) {
            return NextResponse.json(
                { error: 'Backend API URL is not configured' },
                { status: 500 }
            );
        }

        console.log('Sending data to backend:', JSON.stringify(data, null, 2));

        const backendResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!backendResponse.ok) {
            const errorText = await backendResponse.text();
            console.error('Backend API Error:', errorText);
            return NextResponse.json(
                { error: 'Failed to send data to backend', details: errorText },
                { status: backendResponse.status }
            );
        }

        const responseBody = await backendResponse.json();
        console.log('Backend API Response:', JSON.stringify(responseBody, null, 2));

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
