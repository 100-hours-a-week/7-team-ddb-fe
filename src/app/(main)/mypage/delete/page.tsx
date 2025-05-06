'use client';

import { useRouter } from 'next/navigation';

import { DeleteAccountForm } from '@/features/user';
import { Header } from '@/shared/components';

export default function DeleteAccountPage() {
  const router = useRouter();

  return (
    <>
      <Header
        title="회원 탈퇴"
        onBackClick={() => router.back()}
        showBackButton
      />
      <DeleteAccountForm />
    </>
  );
}
