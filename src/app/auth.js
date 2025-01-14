export const GET = handleAuth({
  login: async (req, res) => {
    try {
      await handleAuth({
        authorizationParams: {
          connection: 'email',
        }
      })(req, res);
    } catch (error) {
      console.error(error);
    }
  }
});
