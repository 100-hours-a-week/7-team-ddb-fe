'use client';

import { useEffect, useState } from 'react';

import { getPlaceBusinessStatus } from '../../api';
import { OpenHoursStatus } from '../../types';

interface PlaceBusinessStatusProps {
  placeId: string;
}

export function PlaceBusinessStatus({ placeId }: PlaceBusinessStatusProps) {
  const [openHoursStatus, setOpenHoursStatus] =
    useState<OpenHoursStatus | null>(null);

  useEffect(() => {
    const fetchOpenHoursStatus = async () => {
      const data = await getPlaceBusinessStatus({ placeId });
      setOpenHoursStatus(data);
    };

    fetchOpenHoursStatus();
  }, []);

  if (openHoursStatus === null) {
    return (
      <p className="heading-3 my-3 font-medium text-gray-600">
        영업 상태를 불러오는 중입니다.
      </p>
    );
  }

  return (
    <>
      {openHoursStatus.status === '영업중' && (
        <p className="heading-3 my-3 font-medium text-green-600">영업 중</p>
      )}
      {openHoursStatus.status !== '영업중' && (
        <p className="heading-3 my-3 font-medium text-red-600">
          {openHoursStatus.status}
        </p>
      )}
    </>
  );
}
