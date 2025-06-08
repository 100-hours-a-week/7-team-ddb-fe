import { MoreVertical, Trash2 } from 'lucide-react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components';

interface CommentOwnerDropDownProps {
  onDelete: (id: string) => void;
  id: string;
}

export function CommentOwnerDropDown({
  onDelete,
  id,
}: CommentOwnerDropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => onDelete?.(id)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
