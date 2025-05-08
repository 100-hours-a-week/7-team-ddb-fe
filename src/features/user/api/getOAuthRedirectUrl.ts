import { OAuthRedirectResponse } from '../types';

import { fetchApi } from '@/shared/lib/fetchApi';

export async function getOAuthRedirectUrl(): Promise<OAuthRedirectResponse> {
  try {
    const response =
      await fetchApi<OAuthRedirectResponse>('/api/v1/auth/oauth');
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
