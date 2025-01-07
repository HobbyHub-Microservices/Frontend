import {NextResponse} from "next/server";

export async function GET(request: Request) {
    try {
        const apiUrl = process.env.POSTQUERY_API_URL;
        console.log(apiUrl)
        if (!apiUrl) {
            return NextResponse.json(
                { error: 'Backend API URL is not configured' },
                { status: 500 }
            );
        }

        console.log('Fetching data from backend:', apiUrl);

        const backendResponse = await fetch(apiUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(backendResponse);

        if (!backendResponse.ok) {
            const errorText = await backendResponse.text();
            console.error('Backend API Error:', errorText);
            return NextResponse.json(
                { error: 'Failed to fetch data from backend', details: errorText },
                { status: backendResponse.status }
            );
        }

        const responseBody = await backendResponse.json();
        console.log('Backend API Response:', JSON.stringify(responseBody, null, 2));

        return NextResponse.json(
            { message: 'Data fetched successfully', data: responseBody },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error in GetQuery handler:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    }
}
