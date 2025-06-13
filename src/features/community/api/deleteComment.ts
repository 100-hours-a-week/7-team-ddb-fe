import { fetchApi } from '@/shared/lib/fetchApi';

export async function deleteComment(
  momentId: number,
  commentId: number,
): Promise<string> {
  try {
    const response = await fetchApi<string>(
      `/api/v1/moments/${momentId}/comments/${commentId}`,
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
