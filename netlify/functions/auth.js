exports.handler = async () => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = `${process.env.URL}/.netlify/functions/callback`;
  const scope = 'repo,user';

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;

  return {
    statusCode: 302,
    headers: {
      Location: authUrl,
    },
  };
};