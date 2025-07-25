import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { cache } from 'react';

import {
  getComments,
  getMomentById,
  INFINITE_SCROLL,
  MomentDetailClient,
} from '@/features/community';
import { FullScreenMessage } from '@/shared/components';

export interface MomentDetailPageProps {
  params: Promise<{ id: string }>;
}

const getCachedMoment = cache(async (id: number, cookie: string) => {
  return await getMomentById(id, cookie);
});

export async function generateMetadata({
  params,
}: MomentDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const cookie = (await cookies()).toString();

  try {
    const moment = await getCachedMoment(Number(id), cookie);

    if (!moment) {
      return {
        title: 'Dolpin | 기록을 찾을 수 없습니다',
        description: '요청하신 기록을 찾을 수 없습니다.',
      };
    }

    const title = `Dolpin | ${moment.title}`;
    const description =
      moment.content.length > 100
        ? `${moment.content.substring(0, 100)}...`
        : moment.content;

    const imageUrl =
      moment.images && moment.images.length > 0
        ? moment.images[0]
        : '/img/openGraph.jpg';

    return {
      title,
      description,
      keywords: `${moment.title}, 장소 기록, 여행 후기, ${moment.place?.name || ''}`,
      openGraph: {
        title,
        description,
        url: `https://dolpin.site/moments/${id}`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: moment.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch {
    return {
      title: 'Dolpin | 기록을 불러올 수 없습니다',
      description: '기록을 불러오는 중 오류가 발생했습니다.',
    };
  }
}

export default async function MomentDetailPage({
  params,
}: MomentDetailPageProps) {
  const { id } = await params;
  const cookie = (await cookies()).toString();

  const moment = await getCachedMoment(Number(id), cookie);

  const comments = await getComments({
    limit: INFINITE_SCROLL.COMMENTS_PER_PAGE,
    cursor: null,
    momentId: Number(id),
    cookie,
  });

  if (!moment) {
    return <FullScreenMessage message="존재하지 않는 기록 id 입니다." />;
  }

  return <MomentDetailClient moment={moment} comments={comments} />;
}
