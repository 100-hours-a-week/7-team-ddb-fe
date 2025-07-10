import { describe, it, expect } from '@jest/globals';

import { ImmutableDate } from './ImmutableDate';

describe('ImmutableDate 클래스', () => {
  const BASE_DATE = new Date('2025-06-01T12:00:00Z');

  it('KST 기준으로 날짜 포맷이 잘 되는지 확인', () => {
    const date = new ImmutableDate(BASE_DATE);
    expect(date.format('yyyy.MM.dd')).toBe('2025.06.01');
    expect(date.format('yyyy-MM-dd HH:mm')).toBe('2025-06-01 21:00');
  });

  it('KST 시간대로 변환된 날짜가 맞는지 확인', () => {
    const date = new ImmutableDate(BASE_DATE);
    const kstDate = date.getKSTDate();
    expect(kstDate.getHours()).toBe(21);
  });

  it('getFullYear 메서드가 잘 되는지 확인', () => {
    const date = new ImmutableDate(BASE_DATE);
    expect(date.getFullYear()).toBe(2025);
  });

  it('getMonth 메서드가 잘 되는지 확인', () => {
    const date = new ImmutableDate(BASE_DATE);
    expect(date.getMonth()).toBe(6);
  });

  it('getDate 메서드가 잘 되는지 확인', () => {
    const date = new ImmutableDate(BASE_DATE);
    expect(date.getDate()).toBe(1);
  });

  it('분 차이 계산이 잘 되는지 확인', () => {
    const date1 = new ImmutableDate(BASE_DATE);
    const date2 = new ImmutableDate('2025-06-01T12:10:00Z');
    expect(date1.differenceInMinutes(date2)).toBe(-10);
  });

  it('분 차이 계산이 잘 되는지 확인', () => {
    const date1 = new ImmutableDate(BASE_DATE);
    const date2 = new ImmutableDate('2025-06-01T11:40:00Z');
    expect(date1.differenceInMinutes(date2)).toBe(20);
  });

  it('시간 차이 계산이 잘 되는지 확인', () => {
    const date1 = new ImmutableDate(BASE_DATE);
    const date2 = new ImmutableDate('2025-06-01T13:00:00Z');
    expect(date1.differenceInHours(date2)).toBe(-1);
  });

  it('시간 차이 계산이 잘 되는지 확인', () => {
    const date1 = new ImmutableDate(BASE_DATE);
    const date2 = new ImmutableDate('2025-06-01T10:00:00Z');
    expect(date1.differenceInHours(date2)).toBe(2);
  });

  it('일(day) 차이 계산이 잘 되는지 확인', () => {
    const date1 = new ImmutableDate(BASE_DATE);
    const date2 = new ImmutableDate('2025-06-02T12:00:00Z');
    expect(date1.differenceInDays(date2)).toBe(-1);
  });

  it('일(day) 차이 계산이 잘 되는지 확인', () => {
    const date1 = new ImmutableDate(BASE_DATE);
    const date2 = new ImmutableDate('2025-05-31T12:00:00Z');
    expect(date1.differenceInDays(date2)).toBe(1);
  });

  it('주(week) 차이 계산이 잘 되는지 확인', () => {
    const date1 = new ImmutableDate(BASE_DATE);
    const date2 = new ImmutableDate('2025-06-15T12:00:00Z');
    expect(date1.differenceInWeeks(date2)).toBe(-2);
  });

  it('주(week) 차이 계산이 잘 되는지 확인', () => {
    const date1 = new ImmutableDate(BASE_DATE);
    const date2 = new ImmutableDate('2025-06-01T12:00:00Z');
    expect(date1.differenceInWeeks(date2)).toBe(0);
  });
});
