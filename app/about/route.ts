import { NextRequest, NextResponse } from 'next/server';

const SUMUP_CLIENT_ID = process.env.SUMUP_CLIENT_ID;
const SUMUP_CLIENT_SECRET = process.env.SUMUP_CLIENT_SECRET;

async function getSumUpAccessToken() {
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

  const data = await response.json();
  return data.access_token;
}

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, description, registrationId, userEmail } = await request.json();
    const accessToken = await getSumUpAccessToken();

    const checkoutResponse = await fetch('https://api.sumup.com/v0.1/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        checkout_reference: registrationId, // Your internal unique ID for this transaction
        amount: amount,
        currency: currency,
        pay_to_email: 'payment@projektart.eu',
        description: description,
        redirect_url: 'https://ismit2026.com/payment/success',
        merchant_code: 'cc_classic_ObmAfs4QhtuTL8MzvYvdInnl7eC1H', // Your Client ID
      }),
    });

    const checkoutData = await checkoutResponse.json();
    return NextResponse.json(checkoutData);

  } catch (error) {
    console.error('Error creating SumUp checkout:', error);
    return NextResponse.json({ error: 'Failed to create payment checkout.' }, { status: 500 });
  }
}