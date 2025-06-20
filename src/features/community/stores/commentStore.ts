import { create } from 'zustand';

interface ReplyState {
  isReplying: boolean;
  targetUserId: number | null;
  targetUserNickname: string | null;
  parentCommentId: number | null;
}

interface CommentStore {
  replyState: ReplyState;
  startReply: (userId: number, nickname: string, commentId: number) => void;
  cancelReply: () => void;
}

export const useCommentStore = create<CommentStore>((set) => ({
  replyState: {
    isReplying: false,
    targetUserId: null,
    targetUserNickname: null,
    parentCommentId: null,
  },
  startReply: (userId: number, nickname: string, commentId: number) => {
    set({
      replyState: {
        isReplying: true,
        targetUserId: userId,
        targetUserNickname: nickname,
        parentCommentId: commentId,
      },
    });
  },

  cancelReply: () => {
    set({
      replyState: {
        isReplying: false,
        targetUserId: null,
        targetUserNickname: null,
        parentCommentId: null,
      },
    });
  },
}));
