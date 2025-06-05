import { dummyMomentListData, MomentList } from '@/features/community';

export default function Moments() {
  return (
    <div className="overflow-scrolling-touch flex-1 overflow-y-auto pb-22">
      <MomentList moments={dummyMomentListData} />
    </div>
  );
}
