import { PlaceItemType } from '../types';

import { fetchApi } from '@/shared/lib/fetchApi';

interface GetBookmarksParams {
  cookie?: string;
}

interface GetBookmarksResponse {
  bookmarks: PlaceItemType[];
}

export async function getBookmarks(
  params: GetBookmarksParams,
): Promise<GetBookmarksResponse> {
  try {
    const response = await fetchApi<GetBookmarksResponse>(
      '/api/v1/users/bookmarks',
      {
        headers: params.cookie ? { Cookie: params.cookie } : undefined,
      },
    );
    return response;
  } catch (error) {
    console.error('북마크 조회 실패:', error);
    throw error;
  }
}
