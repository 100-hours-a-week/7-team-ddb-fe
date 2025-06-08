'use client';

import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
// import { useRouter } from 'next/navigation';

import { Button } from '@/shared/components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components';

interface MomentDetailOwnerDropdownProps {
  momentId: string;
}

export function MomentDetailOwnerDropdown({
  momentId,
}: MomentDetailOwnerDropdownProps) {
  // const router = useRouter();

  const handleEdit = () => {
    // router.push(`/moments/${momentId}/edit`);
    console.log('edit', momentId);
  };

  const handleDelete = () => {
    console.log('delete');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEdit}>
          <Pencil className="mr-2 h-4 w-4" />
          수정하기
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          삭제하기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
