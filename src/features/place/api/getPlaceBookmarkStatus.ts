import { fetchApi } from '@/shared/lib/fetchApi';

interface GetPlaceBookmarkStatusParams {
  placeId: number;
}

interface BookmarkStatusResponse {
  is_bookmarked: boolean;
}

export async function getPlaceBookmarkStatus({
  placeId,
}: GetPlaceBookmarkStatusParams): Promise<BookmarkStatusResponse> {
  try {
    const response = await fetchApi<BookmarkStatusResponse>(
      `/api/v1/users/bookmarks/${placeId}`,
    );
    return response;
  } catch (error) {
    console.error('북마크 상태 조회 실패:', error);
    return {
      is_bookmarked: false,
    };
  }
}
