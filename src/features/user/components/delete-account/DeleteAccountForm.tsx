'use client';

import { useState } from 'react';

import { Button } from '@/shared/components';

export function DeleteAccountForm() {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleDelete = () => {
    // TODO: 회원 탈퇴 API 연동
    console.log('회원 탈퇴');
  };

  return (
    <div className="mt-12 flex flex-col px-6">
      <h2 className="heading-3 mb-6 text-center">회원 탈퇴 전 확인해주세요!</h2>

      <div className="body-text mb-8 space-y-4 rounded-lg bg-gray-50 p-4 text-gray-600">
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>
              탈퇴 시, 작성하신 기록은 모두 삭제되며 복구할 수 없습니다.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>위치 정보 및 개인화된 추천 데이터 또한 삭제 처리됩니다.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>
              동일 계정으로 재가입하셔도 기존 정보는 복원되지 않습니다.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>
              탈퇴 후에는 회원 전용 기능(기록 저장, 댓글 작성, 맞춤 추천 등)을
              이용하실 수 없습니다.
            </span>
          </li>
        </ul>
      </div>

      <div className="mb-8 flex items-center gap-2">
        <input
          type="checkbox"
          id="agree"
          checked={isAgreed}
          onChange={(e) => setIsAgreed(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        <label htmlFor="agree" className="body-text text-gray-600">
          위 내용을 모두 확인하였으며, 탈퇴에 동의합니다.
        </label>
      </div>

      <Button
        onClick={handleDelete}
        disabled={!isAgreed}
        className="h-12 w-full bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-300"
      >
        탈퇴하기
      </Button>
    </div>
  );
}
