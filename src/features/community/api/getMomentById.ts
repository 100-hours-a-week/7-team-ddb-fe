import { MomentDetail, Place } from '../types';

import { fetchApi } from '@/shared/lib/fetchApi';

export interface MomentDetailApiResponse {
  id: number;
  title: string;
  content: string;
  images: string[];
  is_public: boolean;
  is_owner: boolean;
  created_at: string;
  view_count: number;
  comment_count: number;
  place: Place | null;
  author: {
    id: number;
    nickname: string;
    profile_image: string | null;
  };
}

function transformMomentDetail(
  response: MomentDetailApiResponse,
): MomentDetail {
  return {
    id: response.id,
    title: response.title,
    content: response.content,
    images: response.images,
    isPublic: response.is_public,
    isOwner: response.is_owner,
    createdAt: response.created_at,
    viewCount: response.view_count,
    commentCount: response.comment_count,
    place: response.place
      ? {
          id: response.place.id,
          name: response.place.name,
        }
      : null,
    author: {
      id: response.author.id,
      nickname: response.author.nickname,
      profileImage: response.author.profile_image,
    },
  };
}

export async function getMomentById(
  momentId: number,
  cookie?: string,
): Promise<MomentDetail> {
  try {
    const response = await fetchApi<MomentDetailApiResponse>(
      `/api/v1/moments/${momentId}`,
      {
        headers: cookie ? { Cookie: cookie } : undefined,
      },
    );
    return transformMomentDetail(response);
  } catch (error) {
    console.error(`Failed to fetch moment ${momentId}:`, error);
    throw error;
  }
}
