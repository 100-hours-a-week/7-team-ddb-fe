import { fetchApi } from '@/shared/lib/fetchApi';

interface PostBookmarkResponse {
  is_bookmarked: boolean;
}

export async function postBookmark(
  placeId: number,
): Promise<PostBookmarkResponse> {
  try {
    const response = await fetchApi<PostBookmarkResponse>(
      `/api/v1/users/bookmarks/${placeId}`,
      {
        method: 'POST',
      },
    );
    return response;
  } catch (error) {
    console.error('북마크 추가 실패:', error);
    throw error;
  }
}
