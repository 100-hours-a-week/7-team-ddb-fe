import { fetchApi, FetchApiError } from '@/shared/lib/fetchApi';

interface AgreementRequestBody {
  location_agreed: boolean;
  privacy_agreed: boolean;
}

export async function postAgreement(
  body: AgreementRequestBody,
): Promise<string> {
  try {
    const response = await fetchApi<string>('/api/v1/users/agreement', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    return response;
  } catch (error) {
    if (error instanceof FetchApiError) {
      throw new Error(error.message);
    }
    throw error;
  }
}
