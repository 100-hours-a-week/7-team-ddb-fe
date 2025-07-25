import { Suspense } from 'react';

import { OpenHours } from '../../types';
import { PlaceBusinessStatus } from '../place-business-status';

export interface PlaceOpenHoursProps {
  openHours: OpenHours;
  placeId: string;
}

export function PlaceOpenHours({ openHours, placeId }: PlaceOpenHoursProps) {
  return (
    <div className="mb-6">
      <h2 className="heading-2">영업 시간</h2>
      <Suspense
        fallback={
          <p className="heading-3 my-3 font-medium text-gray-600">
            영업 상태를 불러오는 중입니다.
          </p>
        }
      >
        <PlaceBusinessStatus placeId={placeId} />
      </Suspense>

      {openHours.schedules.map((schedule) => (
        <div key={schedule.day} className="my-1 flex justify-between">
          <span className="body-text text-gray-600">
            {schedule.day === 'mon' && '월요일'}
            {schedule.day === 'tue' && '화요일'}
            {schedule.day === 'wed' && '수요일'}
            {schedule.day === 'thu' && '목요일'}
            {schedule.day === 'fri' && '금요일'}
            {schedule.day === 'sat' && '토요일'}
            {schedule.day === 'sun' && '일요일'}
          </span>
          {schedule.hours ? (
            <div>
              <span className="body-text text-gray-800">{schedule.hours}</span>
              {schedule.break_time && (
                <div className="body-text text-gray-400">
                  {schedule.break_time} 브레이크 타임
                </div>
              )}
            </div>
          ) : (
            <span className="body-text text-red-500">휴무</span>
          )}
        </div>
      ))}
    </div>
  );
}
