import Link from 'next/link';

import { MomentItem } from './MomentItem';

import { MomentListType } from '@/features/community/types';

export interface MomentListProps {
  moments: MomentListType;
}

export function MomentList({ moments }: MomentListProps) {
  return (
    <div className="flex flex-col gap-2">
      {moments.map((moment) => (
        <Link href={`/moments/${moment.id}`} key={moment.id}>
          <MomentItem moment={moment} key={moment.id} />
        </Link>
      ))}
    </div>
  );
}
