const SUMUP_CLIENT_ID = process.env.SUMUP_CLIENT_ID;
const SUMUP_CLIENT_SECRET = process.env.SUMUP_CLIENT_SECRET;

let accessToken: string | null = null;
let tokenExpiresAt: number | null = null;

export async function getSumUpAccessToken(): Promise<string> {
  // If we have a token and it's not expired (with a 60-second buffer), return it
  if (accessToken && tokenExpiresAt && Date.now() < tokenExpiresAt - 60000) {
    return accessToken;
  }

  try {
    const response = await fetch('https://api.sumup.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: SUMUP_CLIENT_ID,
        client_secret: SUMUP_CLIENT_SECRET,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch SumUp access token: ${errorData.error_description || response.statusText}`);
    }

    const data = await response.json();
    
    accessToken = data.access_token;
    // data.expires_in is in seconds. Convert to milliseconds.
    tokenExpiresAt = Date.now() + (data.expires_in * 1000);

    if (!accessToken) {
      throw new Error('No access token returned from SumUp');
    }

    return accessToken;
  } catch (error) {
    console.error("Error getting SumUp access token:", error);
    // Invalidate the token on failure
    accessToken = null;
    tokenExpiresAt = null;
    throw error;
  }
}
