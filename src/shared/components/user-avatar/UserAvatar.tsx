import { User } from 'iconoir-react';
import Image from 'next/image';

export interface UserAvatarProps {
  imageUrl: string | null;
  size?: 'small' | 'medium' | 'large';
}

export function UserAvatar({ imageUrl, size = 'medium' }: UserAvatarProps) {
  const sizeMap = {
    small: 12,
    medium: 24,
    large: 32,
  };

  const iconSizeMap = {
    small: 8,
    medium: 12,
    large: 24,
  };

  return (
    <div
      className={`relative aspect-square w-${sizeMap[size]} overflow-hidden rounded-full`}
    >
      {imageUrl ? (
        <Image src={imageUrl} alt="user avatar" className="object-cover" fill />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-200">
          <User
            className={`h-${iconSizeMap[size]} w-${iconSizeMap[size]} text-gray-400`}
          />
        </div>
      )}
    </div>
  );
}
