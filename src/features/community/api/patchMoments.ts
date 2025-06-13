import { MomentFormValues } from '../schemas';

import { fetchApi } from '@/shared/lib/fetchApi';

type PatchMomentRequestBody = Partial<
  Pick<MomentFormValues, 'title' | 'content' | 'images' | 'is_public'>
>;

interface PatchMomentParams {
  momentId: number;
  data: PatchMomentRequestBody;
}

interface PatchMomentResponse {
  id: number;
  update_at: string;
}

export async function patchMoment({
  momentId,
  data,
}: PatchMomentParams): Promise<PatchMomentResponse> {
  try {
    const response = await fetchApi<PatchMomentResponse>(
      `/api/v1/users/moments/${momentId}`,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
      },
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
