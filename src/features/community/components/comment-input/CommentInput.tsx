'use client';

import { Send } from 'lucide-react';
import { useState } from 'react';

import { Button, Input } from '@/shared/components';

interface CommentInputProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
}

export function CommentInput({
  onSubmit,
  placeholder = '댓글을 입력하세요...',
}: CommentInputProps) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content);
    setContent('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-background mobile-width fixed bottom-20 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 border-t p-4 pb-7">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1"
      />
      <Button
        onClick={handleSubmit}
        disabled={!content.trim()}
        size="icon"
        variant="ghost"
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
}
