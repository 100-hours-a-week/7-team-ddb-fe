import { MomentListType, MomentType } from '../types';

import { fetchApi } from '@/shared/lib/fetchApi';

interface getMomentsParams {
  limit: number;
  cursor: string | null;
  type: MomentType;
  userId?: number;
  cookie?: string;
  placeId?: number;
}

interface MomentListResponse {
  moments: {
    id: number;
    title: string;
    content: string;
    thumbnail: string | null;
    images_count: number;
    is_public: boolean;
    created_at: string;
    view_count: number;
    comment_count: number;
    author: {
      id: number;
      nickname: string;
      profile_image: string | null;
    };
  }[];
  meta: {
    pagination: {
      limit: number;
      next_cursor: string | null;
      has_next: boolean;
    };
  };
  _links: {
    self: {
      href: string;
    } | null;
    next: {
      href: string;
    } | null;
  };
}

export async function getMoments(
  params: getMomentsParams,
): Promise<MomentListType> {
  const { limit, cursor, type, userId, cookie, placeId } = params;
  const queryParams = new URLSearchParams({
    limit: String(limit),
  });

  if (cursor) {
    queryParams.append('cursor', cursor);
  }

  let endpoint = '/api/v1/users/moments';
  if (type === 'my') {
    endpoint = '/api/v1/users/me/moments';
  } else if (type === 'user' && userId) {
    endpoint = `/api/v1/users/${userId}/moments`;
  } else if (type === 'user' && !userId) {
    throw new Error('userId is required for user moment type');
  } else if (type === 'place' && placeId) {
    endpoint = `/api/v1/places/${placeId}/moments`;
  }

  try {
    const response = await fetchApi<MomentListResponse>(
      `${endpoint}?${queryParams.toString()}`,
      {
        headers: cookie ? { Cookie: cookie } : undefined,
      },
    );
    return {
      items: response.moments.map((moment) => ({
        id: moment.id,
        title: moment.title,
        content: moment.content,
        thumbnail: moment.thumbnail,
        imagesCount: moment.images_count,
        isPublic: moment.is_public,
        createdAt: moment.created_at,
        viewCount: moment.view_count,
        commentCount: moment.comment_count,
        author:
          type === 'all' || type === 'place'
            ? {
                id: moment.author.id,
                nickname: moment.author.nickname,
                profileImage: moment.author.profile_image,
              }
            : null,
      })),
      pagination: {
        limit: response.meta.pagination.limit,
        nextCursor: response.meta.pagination.next_cursor,
        hasNext: response.meta.pagination.has_next,
      },
      links: {
        self: { href: response._links.self?.href ?? '' },
        next: { href: response._links.next?.href ?? '' },
      },
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
