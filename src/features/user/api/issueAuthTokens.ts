import { AuthTokens, TokensRequestBody } from '../types';

import { fetchApi, FetchApiError } from '@/shared/lib/fetchApi';

export async function issueAuthTokens(
  body: TokensRequestBody,
): Promise<AuthTokens> {
  try {
    const response = await fetchApi<AuthTokens>('/api/v1/auth/tokens', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    return response;
  } catch (error) {
    if (error instanceof FetchApiError) {
      throw new Error(error.message);
    }
    throw error;
  }
}
