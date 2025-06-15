import { getMoments } from '../../api';
import { INFINITE_SCROLL } from '../../constants';
import { MomentList } from '../moment-list';

export interface PlaceMomentSectionProps {
  placeId: number;
}

export async function PlaceMomentSection({ placeId }: PlaceMomentSectionProps) {
  const initialMoments = await getMoments({
    limit: INFINITE_SCROLL.MOMENTS_PER_PAGE,
    cursor: null,
    type: 'place',
    placeId,
  });

  return (
    <div className="my-6 w-full">
      <h2 className="heading-2 mb-4">방문 기록</h2>
      {initialMoments.items.length > 0 ? (
        <MomentList
          type="place"
          placeId={placeId}
          initialMoments={initialMoments}
        />
      ) : (
        <div className="my-10 flex h-full flex-col items-center justify-center gap-2">
          <p className="body-text text-gray-500">기록이 없습니다.</p>
          <p className="body-text text-gray-500">첫 번째 기록을 남겨보세요!</p>
        </div>
      )}
    </div>
  );
}
