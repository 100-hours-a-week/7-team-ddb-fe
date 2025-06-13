import { MapPin } from 'iconoir-react';
import Link from 'next/link';

import { Place } from '../../types';

export interface MomentDetailContentProps {
  content: string;
  place: Place | null;
}

export function MomentDetailContent({
  content,
  place,
}: MomentDetailContentProps) {
  return (
    <div className="my-7 flex flex-col gap-2">
      <div className="text-sm">{content}</div>
      {place && (
        <div className="bg-card mt-4 rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <MapPin className="text-muted-foreground h-4 w-4" />
            <h3 className="font-medium">{place.name}</h3>
            <Link href={`/places/${place.id}`}>
              <span className="text-muted-foreground text-sm">더보기</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
