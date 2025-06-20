import { CommentListType } from '../types';

import { fetchApi } from '@/shared/lib/fetchApi';

interface getCommentsParams {
  limit: number;
  cursor: string | null;
  momentId: number;
  cookie?: string;
}

interface GetCommentsResponse {
  comments: {
    id: number;
    user: {
      id: number;
      nickname: string;
      profile_image: string | null;
    };
    parent_comment_id: number | null;
    content: string;
    created_at: string;
    is_owner: boolean;
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

export async function getComments(
  params: getCommentsParams,
): Promise<CommentListType> {
  const { limit, cursor, momentId, cookie } = params;
  const queryParams = new URLSearchParams({
    limit: String(limit),
  });

  if (cursor) {
    queryParams.append('cursor', cursor);
  }

  const endpoint = `/api/v1/moments/${momentId}/comments`;

  try {
    const response = await fetchApi<GetCommentsResponse>(
      `${endpoint}?${queryParams.toString()}`,
      {
        headers: cookie ? { Cookie: cookie } : undefined,
      },
    );
    return {
      items: response.comments.map((comment) => ({
        id: comment.id,
        user: {
          id: comment.user.id,
          nickname: comment.user.nickname,
          profileImage: comment.user.profile_image,
        },
        parentCommentId: comment.parent_comment_id,
        content: comment.content,
        createdAt: comment.created_at,
        isOwner: comment.is_owner,
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
