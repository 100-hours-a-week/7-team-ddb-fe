import { fetchApi, FetchApiError } from '@/shared/lib/fetchApi';

interface AgreementRequestBody {
  locationAgreed: boolean;
  privacyAgreed: boolean;
}

export async function postAgreement(
  body: AgreementRequestBody,
): Promise<string> {
  try {
    console.log('body', body);

    const response = await fetchApi<string>('/api/v1/users/agreement', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    console.log('response', response);

    return response;
  } catch (error) {
    if (error instanceof FetchApiError) {
      throw new Error(error.message);
    }
    throw error;
  }
}
