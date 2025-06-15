'use client';

import { useRouter } from 'next/navigation';

import { patchUser, ProfileForm, UserProfile, useUser } from '@/features/user';
import { Header } from '@/shared/components';

export default function MyPage() {
  const router = useRouter();
  const { user } = useUser();

  if (!user) {
    return <div>로딩중...</div>;
  }

  const { username, profile_image, introduction } = user;
  const handleSubmit = async (data: UserProfile) => {
    await patchUser({
      ...data,
    });

    router.replace('/mypage');
  };

  return (
    <>
      <Header
        title="회원정보 수정"
        onBackClick={() => router.back()}
        showBackButton
      />
      <div className="mt-12 flex flex-col items-center px-4">
        <ProfileForm
          defaultValues={{
            username,
            profile_image,
            introduction,
          }}
          buttonText="수정하기"
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
