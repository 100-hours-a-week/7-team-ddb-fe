'use client';

import { UserAvatar } from '@/shared/components';

interface ProfileProps {
  username: string;
  profileImage: string;
  introduction: string;
}

export function Profile({
  username,
  profileImage,
  introduction,
}: ProfileProps) {
  return (
    <div className="flex flex-col items-center px-4 py-6">
      <UserAvatar imageUrl={profileImage} size="large" />
      <h1 className="heading-2 mt-4 mb-2">{username}</h1>
      <p className="body-text mb-4 text-center whitespace-pre-line text-gray-600">
        {introduction}
      </p>
    </div>
  );
}
