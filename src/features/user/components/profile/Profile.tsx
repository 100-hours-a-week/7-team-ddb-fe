'use client';

import { User } from 'iconoir-react';

import { UserProfile } from '../../types';

interface ProfileProps {
  profile: UserProfile;
}

export function Profile({ profile }: ProfileProps) {
  return (
    <div className="flex flex-col items-center px-4 py-6">
      <div className="relative mb-4 aspect-square w-32 overflow-hidden rounded-full">
        {profile.profile_image ? (
          <img
            src={profile.profile_image}
            alt={profile.nickname}
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200">
            <User className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>
      <h1 className="heading-2 mb-2">{profile.nickname}</h1>
      <p className="body-text mb-4 text-center whitespace-pre-line text-gray-600">
        {profile.introduction}
      </p>
    </div>
  );
}
