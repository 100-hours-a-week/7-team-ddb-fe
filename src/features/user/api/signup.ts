import { fetchApi } from '@/shared/lib/fetchApi';

interface SignupRequestBody {
  nickname: string;
  introduction?: string;
  profileImage?: string;
}

export async function postUser(data: SignupRequestBody): Promise<string> {
  try {
    const response = await fetchApi<string>('/api/v1/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    return response;
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
}
