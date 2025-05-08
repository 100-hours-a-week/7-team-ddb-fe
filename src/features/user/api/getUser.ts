import { User } from '../types';

import { fetchApi } from '@/shared/lib/fetchApi';

export async function getUser(): Promise<User> {
  try {
    const response = await fetchApi<User>('/api/v1/users/me');
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
