import { OpenHours } from '../../types';

export interface PlaceOpenHoursProps {
  openHours: OpenHours;
}

export function PlaceOpenHours({ openHours }: PlaceOpenHoursProps) {
  return (
    <div className="mb-6">
      <h2 className="heading-2 mb-3">영업 시간</h2>
      <p className="body-text mb-2 font-medium text-green-600">
        {openHours.status}
      </p>
      <div className="space-y-2">
        {openHours.schedules.map((schedule) => (
          <div key={schedule.day} className="flex justify-between">
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
              <span className="body-text text-gray-800">{schedule.hours}</span>
            ) : (
              <span className="body-text text-red-500">{schedule.note}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
