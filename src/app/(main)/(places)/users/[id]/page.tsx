import { cookies } from 'next/headers';

import { getMoments, MomentList } from '@/features/community';
import { getUserById, Profile } from '@/features/user';
import { FullScreenMessage, Header } from '@/shared/components';

export interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const cookie = (await cookies()).toString();
  const { id } = await params;
  const user = await getUserById(Number(id));
  const moments = await getMoments({
    limit: 5,
    cursor: null,
    type: 'user',
    userId: Number(id),
    cookie,
  });

  if (!user) {
    return <FullScreenMessage message="로그인이 필요합니다." />;
  }

  const { username, profile_image, introduction } = user;

  return (
    <div className="flex h-full flex-col">
      <div className="mobile-width z-30 flex w-full flex-shrink-0">
        <Header showBackButton />
      </div>
      <main className="flex-grow overflow-y-auto pb-22">
        <Profile
          username={username}
          profileImage={profile_image ?? ''}
          introduction={introduction ?? ''}
        />
        <div className="px-4 pt-4">
          <MomentList
            initialMoments={moments}
            type="user"
            userId={Number(id)}
          />
        </div>
      </main>
    </div>
  );
}
