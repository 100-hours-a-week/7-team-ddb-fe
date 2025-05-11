'use client';

import { User } from 'iconoir-react';

interface ProfileProps {
  username: string;
  profile_image: string;
  introduction: string;
}

export function Profile({
  username,
  profile_image,
  introduction,
}: ProfileProps) {
  return (
    <div className="flex flex-col items-center px-4 py-6">
      <div className="relative mb-4 aspect-square w-32 overflow-hidden rounded-full">
        {profile_image ? (
          <img
            src={profile_image}
            alt={username}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200">
            <User className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>
      <h1 className="heading-2 mb-2">{username}</h1>
      <p className="body-text mb-4 text-center whitespace-pre-line text-gray-600">
        {introduction}
      </p>
    </div>
  );
}
