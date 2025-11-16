// Simple test script to verify OAuth endpoints - Node.js 18+ has built-in fetch

async function testOAuthStart() {
  try {
    console.log('Testing OAuth start endpoint...');

    const response = await fetch('http://localhost:3002/api/auth/threads/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers.raw());

    const data = await response.json();
    console.log('Response body:', JSON.stringify(data, null, 2));

    if (data.success && data.redirect_url) {
      console.log('✅ OAuth start endpoint working!');
      console.log('📋 Redirect URL:', data.redirect_url);
    } else {
      console.log('❌ OAuth start endpoint failed');
    }
  } catch (error) {
    console.error('❌ Error testing OAuth start:', error.message);
  }
}

async function testOAuthCallback() {
  try {
    console.log('\nTesting OAuth callback endpoint with invalid parameters...');

    const response = await fetch('http://localhost:3002/api/auth/threads/callback?error=access_denied', {
      method: 'GET',
    });

    console.log('Response status:', response.status);

    const data = await response.text();
    console.log('Response body (first 200 chars):', data.substring(0, 200));

    if (response.status === 400) {
      console.log('✅ OAuth callback properly handles errors!');
    } else {
      console.log('❌ OAuth callback should return 400 for errors');
    }
  } catch (error) {
    console.error('❌ Error testing OAuth callback:', error.message);
  }
}

async function main() {
  console.log('🧪 Testing Threads OAuth Implementation\n');

  await testOAuthStart();
  await testOAuthCallback();

  console.log('\n🏁 Test completed');
}

main().catch(console.error);