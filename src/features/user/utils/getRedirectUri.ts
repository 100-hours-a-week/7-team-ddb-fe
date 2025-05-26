export const getRedirectUri = () => {
  if (process.env.NODE_ENV === 'development') {
    return process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI;
  }
  return null;
};
