'use client';

import { useRouter } from 'next/navigation';

import { mockUserProfile, Profile } from '@/features/user';
import { Header } from '@/shared/components';

export default function MyPage() {
  const router = useRouter();
  const handleEdit = () => {
    router.push('/mypage/edit');
  };

  const handleWithdraw = () => {
    router.push('/mypage/delete');
  };

  return (
    <>
      <Header title="마이페이지" />
      <div className="mt-12 flex flex-col items-center px-4">
        <Profile profile={mockUserProfile} />
        <button
          onClick={handleEdit}
          className="button-text mb-4 w-1/2 rounded-full bg-rose-100 px-4 py-2 text-gray-800 transition-colors hover:bg-rose-200"
        >
          회원정보 수정
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
