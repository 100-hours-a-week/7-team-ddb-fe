import { MomentFormValues } from '../schemas';

import { fetchApi } from '@/shared/lib/fetchApi';

type CreateMomentRequest = MomentFormValues;

interface CreateMomentResponse {
  id: string;
  create_at: string;
}

export async function postMoment(
  params: CreateMomentRequest,
): Promise<CreateMomentResponse> {
  try {
    const response = await fetchApi<CreateMomentResponse>(
      '/api/v1/users/moments',
      {
        method: 'POST',
        body: JSON.stringify(params),
      },
    );

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
