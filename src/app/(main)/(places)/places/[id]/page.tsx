import {
  getPlaceDetail,
  PlaceBasicInfo,
  PlaceMenu,
  PlaceOpenHours,
} from '@/features/place';
import { Header } from '@/shared/components';

interface PlaceDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PlaceDetailPage({
  params,
}: PlaceDetailPageProps) {
  const { id } = await params;

  const place = await getPlaceDetail(id);

  if (!place) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="text-2xl font-bold">존재하지 않는 장소입니다.</div>
      </div>
    );
  }

  const { opening_hours, menu, ...placeBasicInfo } = place;

  return (
    <div className="flex h-screen flex-col">
      <Header showBackButton />
      <div className="flex-1 overflow-y-auto pb-16">
        <div className="container mx-auto mb-4 px-4 py-5">
          <PlaceBasicInfo placeBasicInfo={placeBasicInfo} />
          <PlaceOpenHours openHours={opening_hours} />
          <PlaceMenu menu={menu} />
        </div>
      </div>
    </div>
  );
}
