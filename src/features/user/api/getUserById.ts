import { User } from '../types';

import { fetchApi } from '@/shared/lib/fetchApi';

export async function getUserById(userId: number): Promise<User> {
  try {
    const response = await fetchApi<User>(`/api/v1/users/${userId}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
