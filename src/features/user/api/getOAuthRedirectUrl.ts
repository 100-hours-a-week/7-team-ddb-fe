import { OAuthRedirectResponse } from '../types';
import { getRedirectUri } from '../utils';

import { fetchApi } from '@/shared/lib/fetchApi';

export async function getOAuthRedirectUrl(): Promise<OAuthRedirectResponse> {
  try {
    const redirectUri = getRedirectUri();

    const response = await fetchApi<OAuthRedirectResponse>(
      `/api/v1/auth/oauth${redirectUri ? `?redirect_uri=${redirectUri}` : ''}`,
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
