export type UserProfile = Pick<
  User,
  'username' | 'profile_image' | 'introduction'
>;

export interface User {
  user_id: number;
  provider_id: number;
  username: string;
  profile_image?: string;
  introduction?: string;
  privacy_agreed: boolean;
  location_agreed: boolean;
  privacy_agreed_at: string;
  created_at: string;
  updated_at: string;
}
