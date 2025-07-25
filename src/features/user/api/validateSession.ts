import { fetchApi } from '@/shared/lib/fetchApi';

interface SessionValidationResponse {
  valid: boolean;
}

export async function validateSession(): Promise<SessionValidationResponse> {
  try {
    const response = await fetchApi<SessionValidationResponse>(
      '/api/v1/auth/session',
    );

    if (!response) {
      return {
        valid: false,
      };
    }

    return response;
  } catch (error) {
    console.error('세션 검증 실패:', error);
    return {
      valid: false,
    };
  }
}
