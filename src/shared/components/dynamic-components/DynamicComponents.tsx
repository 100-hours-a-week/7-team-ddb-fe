'use client';

import dynamic from 'next/dynamic';

const Toaster = dynamic(
  () =>
    import('@/shared/components/toaster').then((mod) => ({
      default: mod.Toaster,
    })),
  {
    ssr: false,
    loading: () => null,
  },
);

const GlobalConfirmDialog = dynamic(
  () =>
    import('@/shared/components/global-confirm-dialog').then((mod) => ({
      default: mod.GlobalConfirmDialog,
    })),
  {
    ssr: false,
    loading: () => null,
  },
);

export function DynamicComponents() {
  return (
    <>
      <Toaster />
      <GlobalConfirmDialog />
    </>
  );
}
