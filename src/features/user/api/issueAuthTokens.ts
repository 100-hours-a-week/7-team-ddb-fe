import { AuthTokens, TokensRequestBody } from '../types';
import { getRedirectUri } from '../utils';

import { fetchApi, FetchApiError } from '@/shared/lib/fetchApi';

export async function issueAuthTokens(
  body: TokensRequestBody,
): Promise<AuthTokens> {
  const redirectUri = getRedirectUri();

  try {
    const response = await fetchApi<AuthTokens>(
      `/api/v1/auth/tokens${redirectUri ? `?redirect_uri=${redirectUri}` : ''}`,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
    );

    return response;
  } catch (error) {
    if (error instanceof FetchApiError) {
      throw new Error(error.message);
    }
    throw error;
  }
}
