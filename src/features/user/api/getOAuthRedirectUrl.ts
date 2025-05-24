import { OAuthRedirectResponse } from '../types';

import { fetchApi } from '@/shared/lib/fetchApi';

export async function getOAuthRedirectUrl(): Promise<OAuthRedirectResponse> {
  try {
    const redirectUri =
      process.env.NODE_ENV === 'development' ? 'https://localhost:3000' : null;

    console.log('redirect_uri', redirectUri);

    const response = await fetchApi<OAuthRedirectResponse>(
      `/api/v1/auth/oauth${redirectUri ? `?redirect_uri=${redirectUri}` : ''}`,
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
