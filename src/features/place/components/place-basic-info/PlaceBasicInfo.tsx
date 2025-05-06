import { PlaceDetail } from '../../types';

export interface PlaceBasicInfoProps {
  placeBasicInfo: Omit<PlaceDetail, 'menu' | 'opening_hours'>;
}

export function PlaceBasicInfo({ placeBasicInfo }: PlaceBasicInfoProps) {
  const { thumbnail, name, address, phone, keywords, description } =
    placeBasicInfo;
  return (
    <>
      <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-lg">
        <img
          src={thumbnail}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
      <h1 className="heading-1 mb-4">{name}</h1>
      <div className="mb-6">
        <p className="body-text mb-2 text-gray-600">{address}</p>
        <p className="body-text mb-2 text-gray-600">{phone}</p>
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
