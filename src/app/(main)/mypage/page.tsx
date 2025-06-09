'use client';

import { Profile, ProfileSettingsSheet, useUser } from '@/features/user';
import { FullScreenMessage, Header } from '@/shared/components';

export default function MyPage() {
  const { user } = useUser();

  if (!user) {
    return <FullScreenMessage message="로딩중..." />;
  }

  const { username, profile_image, introduction } = user;

  return (
    <>
      <Header rightElement={<ProfileSettingsSheet />} />
      <div className="mt-12 flex flex-col items-center px-4">
        <Profile
          username={username}
          profileImage={profile_image ?? ''}
          introduction={introduction ?? ''}
        />
      </div>
    </>
  );
}
