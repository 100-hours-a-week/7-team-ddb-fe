import { User } from '../types';

import { fetchApi } from '@/shared/lib/fetchApi';

type PatchUserRequestBody = Partial<
  Pick<User, 'username' | 'profile_image' | 'introduction'>
>;

export async function patchUser(data: PatchUserRequestBody): Promise<User> {
  try {
    const response = await fetchApi<User>('/api/v1/users', {
      method: 'PATCH',
      body: JSON.stringify({
        nickname: data.username,
        profile_image: data.profile_image,
        introduction: data.introduction,
      }),
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
