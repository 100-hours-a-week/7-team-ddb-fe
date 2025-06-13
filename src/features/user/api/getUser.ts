import { User } from '../types';

import { fetchApi } from '@/shared/lib/fetchApi';

export async function getUser(cookie?: string): Promise<User> {
  try {
    const response = await fetchApi<User>('/api/v1/users/me', {
      headers: cookie ? { Cookie: cookie } : undefined,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
