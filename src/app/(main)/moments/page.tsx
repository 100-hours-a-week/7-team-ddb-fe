import {
  dummyMomentListData,
  MomentList,
  WriteMomentFab,
} from '@/features/community';

export default function Moments() {
  return (
    <div className="h-full overflow-y-auto pb-22">
      <MomentList moments={dummyMomentListData} />
      <WriteMomentFab />
    </div>
  );
}
