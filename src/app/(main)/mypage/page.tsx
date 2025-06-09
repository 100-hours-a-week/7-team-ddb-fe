'use client';

import { dummyMomentListData, MomentList } from '@/features/community';
import { dummyPlaceItemData, PlaceList } from '@/features/place';
import {
  Profile,
  ProfileSettingsSheet,
  ProfileTabs,
  useUser,
} from '@/features/user';
import { FullScreenMessage, Header } from '@/shared/components';

export default function MyPage() {
  const { user } = useUser();

  if (!user) {
    return <FullScreenMessage message="로딩중..." />;
  }

  const { username, profile_image, introduction } = user;
  const moments = dummyMomentListData;
  const places = dummyPlaceItemData;

  return (
    <div className="flex h-full flex-col">
      <div className="mobile-width z-30 flex w-full flex-shrink-0">
        <Header rightElement={<ProfileSettingsSheet />} />
      </div>
      <main className="flex-grow overflow-y-auto pb-22">
        <Profile
          username={username}
          profileImage={profile_image ?? ''}
          introduction={introduction ?? ''}
        />
        <div className="flex flex-col items-center px-4 pt-4">
          <ProfileTabs
            momentContent={
              moments.length > 0 ? (
                <MomentList moments={moments} showAuthorInfo={false} />
              ) : null
            }
            bookmarkContent={
              places.length > 0 ? <PlaceList places={places} /> : null
            }
          />
        </div>
      </main>
    </div>
  );
}
