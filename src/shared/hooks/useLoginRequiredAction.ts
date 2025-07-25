import { useConfirmDialogStore } from '../store';

import { useSession } from './useSession';

export function useLoginRequiredAction() {
  const { isLoggedIn } = useSession();
  const openDialog = useConfirmDialogStore((s) => s.openDialog);

  return async (callback: () => void) => {
    if (!isLoggedIn) {
      const shouldLogin = await openDialog({
        title: '로그인이 필요합니다',
        description: '이 기능을 사용하려면 로그인이 필요합니다.',
        confirmText: '로그인하러가기',
        cancelText: '취소',
        confirmButtonClassName: 'bg-rose-400 hover:bg-rose-500 text-white',
      });

      if (shouldLogin) {
        window.location.href = '/onboarding';
      }
      return;
    }

    callback();
  };
}
