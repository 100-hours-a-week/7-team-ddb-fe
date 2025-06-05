import { MomentItem } from './MomentItem';

import { MomentListType } from '@/features/community/types';

export interface MomentListProps {
  moments: MomentListType;
}

export function MomentList({ moments }: MomentListProps) {
  return (
    <div className="flex flex-col gap-2">
      {moments.map((moment) => (
        <MomentItem moment={moment} key={moment.id} />
      ))}
    </div>
  );
}
