'use client';

import { useState } from 'react';

import {
  HeaderCheckButton,
  HeaderVisibilityToggle,
  MomentForm,
} from '@/features/community';
import { Header } from '@/shared/components';

export default function NewMomentPage() {
  const [isPublic, setIsPublic] = useState(false);
  return (
    <div className="overflow-y-auto pb-22">
      <Header
        showBackButton
        rightElement={
          <div className="flex flex-row items-center gap-4">
            <HeaderVisibilityToggle
              isPublic={isPublic}
              onToggle={setIsPublic}
            />
            <HeaderCheckButton
              onClick={() => console.log('clicked')}
              disabled={false}
            />
          </div>
        }
      />
      <MomentForm
        onSubmit={async (data) => {
          console.log(data);
          await Promise.resolve();
        }}
        placeInfo={{
          place_id: '1',
          place_name: '테스트',
        }}
      />
    </div>
  );
}
