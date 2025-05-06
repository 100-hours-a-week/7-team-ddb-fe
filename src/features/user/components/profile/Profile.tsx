'use client';

import { UserProfile } from '../../types/profile';

interface ProfileProps {
  profile: UserProfile;
}

export function Profile({ profile }: ProfileProps) {
  return (
    <div className="flex flex-col items-center px-4 py-6">
      <div className="relative mb-4 aspect-square w-32 overflow-hidden rounded-full">
        <img
          src={profile.profileImage}
          alt={profile.nickname}
          className="object-cover"
        />
      </div>
      <h1 className="heading-2 mb-2">{profile.nickname}</h1>
      <p className="body-text mb-4 text-center whitespace-pre-line text-gray-600">
        {profile.introduction}
      </p>
    </div>
  );
}
