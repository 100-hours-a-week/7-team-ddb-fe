'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { validateSession } from '@/features/user';
import { logout } from '@/features/user/api/logout';

export function useSession() {
  const queryClient = useQueryClient();

  const {
    data: isLoggedIn = false,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      try {
        const response = await validateSession();

        if (!response) {
          return false;
        }
        return response.valid ?? false;
      } catch (error) {
        console.error('세션 검증 실패:', error);
        return false;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const handleLogout = async () => {
    try {
      await logout();
      queryClient.setQueryData(['session'], false);
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return {
    isLoggedIn,
    isLoading,
    refetch,
    logout: handleLogout,
  };
}
