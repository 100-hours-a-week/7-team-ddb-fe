import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';

import { formatDateByType } from './formatDate';

describe('formatDateByType 함수 테스트', () => {
  const baseTime = new Date('2024-05-20T12:00:00Z');

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(baseTime);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('기본 날짜 형식 테스트', () => {
    it('날짜를 yyyy.MM.dd 형식으로 포맷팅한다', () => {
      const isoString = '2023-11-30T15:00:00Z'; // 2023-12-01 00:00:00 KST
      expect(formatDateByType(isoString, 'default')).toBe('2023.12.01');
    });
  });

  describe('상세 날짜 형식 테스트', () => {
    it('날짜를 yy.MM.dd HH:mm 형식으로 포맷팅한다', () => {
      const isoString = '2023-12-31T14:30:00Z'; // 2023-12-31 23:30:00 KST
      expect(formatDateByType(isoString, 'detail')).toBe('23.12.31 23:30');
    });
  });

  describe('상대적 시간 표시 테스트', () => {
    describe('하루 이내 시간 표시', () => {
      it('1분 이내는 "방금 전"으로 표시한다', () => {
        const date = new Date(baseTime.getTime() - 30 * 1000); // 30초 전
        expect(formatDateByType(date.toISOString(), 'relative')).toBe(
          '방금 전',
        );
      });

      it('1시간 이내는 "N분 전"으로 표시한다', () => {
        const date = new Date(baseTime.getTime() - 15 * 60 * 1000); // 15분 전
        expect(formatDateByType(date.toISOString(), 'relative')).toBe(
          '15분 전',
        );
      });

      it('하루 이내는 "N시간 전"으로 표시한다', () => {
        const date = new Date(baseTime.getTime() - 5 * 60 * 60 * 1000); // 5시간 전
        expect(formatDateByType(date.toISOString(), 'relative')).toBe(
          '5시간 전',
        );
      });
    });

    describe('일주일 이내 시간 표시', () => {
      it('어제는 "어제"로 표시한다', () => {
        const date = new Date(baseTime.getTime() - 24 * 60 * 60 * 1000); // 1일 전
        expect(formatDateByType(date.toISOString(), 'relative')).toBe('어제');
      });

      it('며칠 전은 "N일 전"으로 표시한다', () => {
        const date = new Date(baseTime.getTime() - 3 * 24 * 60 * 60 * 1000); // 3일 전
        expect(formatDateByType(date.toISOString(), 'relative')).toBe('3일 전');
      });
    });

    describe('4주 이내 시간 표시', () => {
      it('몇 주 전은 "N주 전"으로 표시한다', () => {
        const date = new Date(baseTime.getTime() - 2 * 7 * 24 * 60 * 60 * 1000); // 2주 전
        expect(formatDateByType(date.toISOString(), 'relative')).toBe('2주 전');
      });
    });

    describe('그 이전 날짜 표시', () => {
      it('올해 날짜는 "M월 D일" 형식으로 표시한다', () => {
        const isoString = '2024-02-15T10:00:00Z';
        expect(formatDateByType(isoString, 'relative')).toBe('2월 15일');
      });

      it('작년 이전 날짜는 "YYYY년 M월 D일" 형식으로 표시한다', () => {
        const isoString = '2022-12-25T10:00:00Z';
        expect(formatDateByType(isoString, 'relative')).toBe(
          '2022년 12월 25일',
        );
      });
    });
  });
});
