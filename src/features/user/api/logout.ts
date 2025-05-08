import { fetchApi } from '@/shared/lib/fetchApi';

export async function logout() {
  try {
    await fetchApi<string>('/api/v1/auth/logout', {
      method: 'POST',
    });

    return true;
  } catch (error) {
    console.error('로그아웃 실패:', error);
    throw error;
  }
}
