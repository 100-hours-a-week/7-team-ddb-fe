'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteComment, postComment } from '../api';

export function useAddComment(queryKey: unknown[], momentId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: { content: string; parent_comment_id?: number }) =>
      postComment({ momentId, ...payload }),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey,
        refetchType: 'active',
      });
    },
  });
}

export function useDeleteComment(queryKey: unknown[], momentId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteComment(momentId, id),
    onSuccess: () => qc.invalidateQueries({ queryKey }),
  });
}
