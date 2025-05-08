'use client';

import { useRouter } from 'next/navigation';

import { ProfileForm, UserProfile } from '@/features/user';
import { postUser } from '@/features/user/api/signup';
import { Header } from '@/shared/components';

export default function Signup() {
  const router = useRouter();

  const handleSubmit = async (data: UserProfile) => {
    try {
      await postUser(data);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header title="회원 가입" />
      <div className="mt-12 flex flex-col items-center px-4">
        <ProfileForm buttonText="회원가입 완료" onSubmit={handleSubmit} />
      </div>
    </>
  );
}
