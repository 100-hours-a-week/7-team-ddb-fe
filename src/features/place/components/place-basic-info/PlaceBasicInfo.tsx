import { PlaceDetail } from '../../types';
import { BookmarkButton } from '../bookmark-button';

export interface PlaceBasicInfoProps {
  placeBasicInfo: Omit<PlaceDetail, 'menu' | 'opening_hours'>;
}

export function PlaceBasicInfo({ placeBasicInfo }: PlaceBasicInfoProps) {
  const {
    id,
    thumbnail,
    name,
    address,
    phone,
    keywords,
    description,
    is_bookmarked,
  } = placeBasicInfo;
  return (
    <>
      <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-lg">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gray-200">
            <div className="flex h-full w-full items-center justify-center">
              <div className="text-center text-gray-500">이미지 없음</div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <h1 className="heading-1 mb-4">{name}</h1>
        <BookmarkButton
          placeId={id}
          initialIsBookmarked={is_bookmarked}
          className=""
        />
      </div>
      <div className="mb-6">
        {address && <p className="body-text mb-2 text-gray-600">{address}</p>}
        {phone && <p className="body-text mb-2 text-gray-600">{phone}</p>}
        <div className="mb-4 flex gap-2">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="caption rounded-full bg-gray-100 px-3 py-1 text-gray-800"
            >
              {keyword}
            </span>
          ))}
        </div>
        <p className="body-text text-gray-700">{description}</p>
      </div>
    </>
  );
}
