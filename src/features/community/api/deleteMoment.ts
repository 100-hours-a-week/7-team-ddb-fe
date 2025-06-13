import { fetchApi } from '@/shared/lib/fetchApi';

export async function deleteMoment(momentId: number): Promise<string> {
  try {
    const response = await fetchApi<string>(
      `/api/v1/users/moments/${momentId}`,
      {
        method: 'DELETE',
      },
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
