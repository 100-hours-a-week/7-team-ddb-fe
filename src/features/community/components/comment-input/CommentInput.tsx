'use client';

import { Send, X } from 'lucide-react';
import { useState } from 'react';

import { useCommentStore } from '../../stores';

import { Button, Input } from '@/shared/components';
import { useLoginRequiredAction } from '@/shared/hooks';

interface CommentInputProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
}

export function CommentInput({
  onSubmit,
  placeholder = '댓글을 입력하세요...',
}: CommentInputProps) {
  const [content, setContent] = useState('');
  const { replyState, cancelReply } = useCommentStore();
  const loginRequiredAction = useLoginRequiredAction();

  const handleSubmit = () => {
    if (!content.trim()) return;

    loginRequiredAction(async () => {
      onSubmit(content);
      setContent('');
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="mobile-width fixed bottom-20 left-1/2 z-10 -translate-x-1/2 bg-white px-4 py-3 pb-7">
      {replyState.isReplying && (
        <div className="flex items-center pb-2 pl-2">
          <p className="text-muted-foreground">
            {replyState.targetUserNickname}님에게 답글 남기는 중 ...
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={cancelReply}
            aria-label="cancel reply"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div className="bg-background flex items-center gap-2">
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 text-base"
        />
        <Button
          onClick={handleSubmit}
          disabled={!content.trim()}
          size="icon"
          variant="ghost"
          aria-label="submit comment"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
