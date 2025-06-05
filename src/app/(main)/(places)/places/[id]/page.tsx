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

  const isMenuEmpty = !menu || menu.length === 0;
  const isOpenHoursEmpty = opening_hours.status === '영업 여부 확인 필요';

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="fixed top-0 z-10 flex w-full max-w-[430px] min-w-[375px]">
        <Header showBackButton />
      </div>
      <div className="flex-1 overflow-y-scroll">
        <div className="mx-auto mb-4 px-4 pt-20 pb-22">
          <PlaceBasicInfo placeBasicInfo={placeBasicInfo} />
          {!isOpenHoursEmpty && <PlaceOpenHours openHours={opening_hours} />}
          {!isMenuEmpty && <PlaceMenu menu={menu} />}
        </div>
      </div>
    </div>
  );
}
