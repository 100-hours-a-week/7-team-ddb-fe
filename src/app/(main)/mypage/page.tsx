'use client';

import { useRouter } from 'next/navigation';

import { Profile, useUser } from '@/features/user';
import { logout } from '@/features/user/api/logout';
import { Header } from '@/shared/components';

export default function MyPage() {
  const router = useRouter();
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        로딩중...
      </div>
    );
  }

  const { username, profile_image, introduction } = user;

  const handleEdit = () => {
    router.push('/mypage/edit');
  };

  const handleWithdraw = () => {
    router.push('/mypage/delete');
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/onboarding');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="mt-12 flex flex-col items-center px-4">
        <Profile
          username={username}
          profileImage={profile_image ?? ''}
          introduction={introduction ?? ''}
        />
        <button
          onClick={handleEdit}
          className="button-text mb-4 w-1/2 rounded-full bg-rose-100 px-4 py-2 text-gray-800 transition-colors hover:bg-rose-200"
        >
          회원정보 수정
        </button>
        <button
          onClick={handleLogout}
          className="button-text mb-4 w-1/2 rounded-full bg-gray-100 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-200"
        >
          로그아웃
        </button>
        <button
          onClick={handleWithdraw}
          className="text-xs text-gray-400 transition-colors hover:text-gray-600"
        >
          회원 탈퇴하기
        </button>
      </div>
    </>
  );
}
