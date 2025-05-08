import { fetchApi } from '@/shared/lib/fetchApi';

export async function deleteUser(): Promise<string> {
  try {
    const response = await fetchApi<string>('/api/v1/users', {
      method: 'DELETE',
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
