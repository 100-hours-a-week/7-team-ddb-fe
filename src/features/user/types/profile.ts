export interface UserProfile {
  id: number;
  nickname: string;
  profileImage: string;
  introduction: string;
}

export const mockUserProfile: UserProfile = {
  id: 1,
  nickname: '장어사랑',
  profileImage:
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop',
  introduction:
    '장어 맛집을 찾아다니는 장어 애호가입니다. \n 특히 장어구이와 장어찜을 좋아합니다.',
};
