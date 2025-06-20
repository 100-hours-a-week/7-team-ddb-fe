import { fetchApi } from '@/shared/lib/fetchApi';

interface PostCommentParams {
  momentId: number;
  parent_comment_id?: number | null;
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
  parent_comment_id: number | null;
  content: string;
  created_at: string;
  is_owner: boolean;
  moment_id: number;
}

export async function postComment(
  params: PostCommentParams,
): Promise<PostCommentResponse> {
  try {
    const response = await fetchApi<PostCommentResponse>(
      `/api/v1/moments/${params.momentId}/comments`,
      {
        method: 'POST',
        body: JSON.stringify({
          content: params.content,
          parent_comment_id: params.parent_comment_id,
        }),
        headers: params.cookie ? { Cookie: params.cookie } : undefined,
      },
    );

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
