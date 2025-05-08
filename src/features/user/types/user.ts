export type UserProfile = Pick<
  User,
  'nickname' | 'profile_image' | 'introduction'
>;

export interface User {
  user_id: number;
  provider_id: number;
  nickname: string;
  profile_image?: string;
  introduction?: string;
  privacy_agreed: boolean;
  location_agreed: boolean;
  privacy_agreed_at: string;
  created_at: string;
  updated_at: string;
}

export const mockUserProfile: UserProfile = {
  nickname: '장어사랑',
  introduction:
    '장어 맛집을 찾아다니는 장어 애호가입니다. \n 특히 장어구이와 장어찜을 좋아합니다.',
};
