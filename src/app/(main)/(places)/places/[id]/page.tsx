import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { cache } from 'react';

import { PlaceMomentSection, WriteMomentFab } from '@/features/community';
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

const getCachedPlace = cache(async (placeId: string, cookie: string) => {
  return await getPlaceDetail({ placeId, cookie });
});

export async function generateMetadata({
  params,
}: PlaceDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const cookie = (await cookies()).toString();

  try {
    const place = await getCachedPlace(id, cookie);

    if (!place) {
      return {
        title: 'Dolpin | 장소를 찾을 수 없습니다',
        description: '요청하신 장소를 찾을 수 없습니다.',
      };
    }

    const title = `Dolpin | ${place.name}`;
    const description = `${place.name}${place.address ? ` - ${place.address}` : ''}. 장소 정보와 실제 방문 후기를 확인하세요.`;
    const keywords = `${place.name}, ${place.address || ''}, 장소 정보, 방문 후기, ${place.keywords.join(', ')}`;

    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/places/${id}`,
        images: [
          {
            url: place.thumbnail || '/img/openGraph.jpg',
            width: 1200,
            height: 630,
            alt: place.name,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [place.thumbnail || '/img/openGraph.jpg'],
      },
    };
  } catch {
    return {
      title: 'Dolpin | 장소를 불러올 수 없습니다',
      description: '장소 정보를 불러오는 중 오류가 발생했습니다.',
    };
  }
}

export default async function PlaceDetailPage({
  params,
}: PlaceDetailPageProps) {
  const { id } = await params;
  const cookie = (await cookies()).toString();

  const place = await getCachedPlace(id, cookie);

  if (!place) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="text-2xl font-semibold">존재하지 않는 장소입니다.</div>
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
          <PlaceMomentSection placeId={Number(id)} />
        </div>
      </div>
      <WriteMomentFab place={place} />
    </div>
  );
}
