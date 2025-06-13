import { MomentItemType } from '../../types';

import { CommunityMomentItem } from './CommunityMomentItem';
import { ProfileMomentItem } from './ProfileMomentItem';

export interface MomentItemProps {
  moment: MomentItemType;
}

export function MomentItem({ moment }: MomentItemProps) {
  if (moment.author) {
    return <CommunityMomentItem moment={moment} />;
  }

  return <ProfileMomentItem moment={moment} />;
}
