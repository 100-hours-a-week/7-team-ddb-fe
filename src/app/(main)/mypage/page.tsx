import { cookies } from 'next/headers';

import { getMoments, MomentList } from '@/features/community';
import { getBookmarks, PlaceList } from '@/features/place';
import {
  getUser,
  Profile,
  ProfileSettingsSheet,
  ProfileTabs,
} from '@/features/user';
import { FullScreenMessage, Header } from '@/shared/components';

export default async function MyPage() {
  const cookie = (await cookies()).toString();
  const user = await getUser(cookie);

  if (!user) {
    return <FullScreenMessage message="로딩중..." />;
  }

  const { username, profile_image, introduction } = user;

  const moments = await getMoments({
    limit: 5,
    cursor: null,
    type: 'my',
    cookie,
  });
  const { bookmarks } = await getBookmarks({
    cookie,
  });

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
              moments.items.length > 0 ? (
                <MomentList initialMoments={moments} type="my" />
              ) : null
            }
            bookmarkContent={
              bookmarks.length > 0 ? <PlaceList places={bookmarks} /> : null
            }
          />
        </div>
      </main>
    </div>
  );
}
