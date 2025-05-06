'use client';

import { useRouter } from 'next/navigation';

import { mockUserProfile, ProfileForm } from '@/features/user';
import { Header } from '@/shared/components';

export default function MyPage() {
  const router = useRouter();

  return (
    <>
      <Header
        title="회원정보 수정"
        onBackClick={() => router.back()}
        showBackButton
      />
      <div className="mt-12 flex flex-col items-center px-4">
        <ProfileForm defaultValues={mockUserProfile} buttonText="수정하기" />
      </div>
    </>
  );
}
