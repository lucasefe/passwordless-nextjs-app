import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  login: handleLogin({
    returnTo: '/verify-code',
    authorizationParams: {
      response_type: 'code',
      screen_hint: 'login', // Forces the login screen
      connection: 'email', // Specifies passwordless email connection
    }
  })
});
