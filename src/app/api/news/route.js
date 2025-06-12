import { NextResponse } from 'next/server';

/**
 * This is a server-side API route that acts as a proxy to the NewsAPI.
 * It securely fetches data on the server, hiding the API key from the client.
 */
export async function GET() {
  // 1. Get the secret API key from server-side environment variables.
  const apiKey = process.env.NEWS_API_KEY;

  // 2. Handle cases where the key is not configured.
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured on the server.' },
      { status: 500 }
    );
  }

  const newsApiUrl = `https://newsapi.org/v2/everything?q=technology&sortBy=publishedAt&apiKey=${apiKey}&pageSize=50`;

  try {
    // 3. Fetch data from the NewsAPI from our server.
    const response = await fetch(newsApiUrl, {
      next: {
        revalidate: 60 * 60, // Re-fetch data from NewsAPI at most once per hour
      },
    });
    
    const data = await response.json();

    // 4. If NewsAPI returns an error, forward it to our client.
    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to fetch news from the source.' },
        { status: response.status }
      );
    }

    // 5. If successful, send the data back to our client.
    return NextResponse.json(data);

  } catch (error) {
    console.error('Proxy API error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error while fetching news.' },
      { status: 500 }
    );
  }
}