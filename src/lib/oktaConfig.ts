export const oktaConfig = {
    clientId: '0oaf7mzrpgUKy3IBS5d7',
    issuer: 'https://dev-43504290.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes:['openid','profile','email'],
    pkce: true,
    disableHttpsCheck: true,
}