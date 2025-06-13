import { fetchApi } from '@/shared/lib/fetchApi';

interface PostCommentParams {
  momentId: number;
  content: string;
  cookie?: string;
}

interface PostCommentResponse {
  id: number;
  user: {
    id: number;
    nickname: string;
    profile_image: string | null;
  };
  content: string;
  created_at: string;
  is_owner: boolean;
  moment_id: number;
}

export async function postComment(
  params: PostCommentParams,
): Promise<PostCommentResponse> {
  try {
    console.log('params', params);
    const response = await fetchApi<PostCommentResponse>(
      `/api/v1/moments/${params.momentId}/comments`,
      {
        method: 'POST',
        body: JSON.stringify({ content: params.content }),
        headers: params.cookie ? { Cookie: params.cookie } : undefined,
      },
    );

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
