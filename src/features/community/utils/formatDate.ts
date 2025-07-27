import { ImmutableDate } from '@/shared/lib/ImmutableDate';

export type DateFormatType = 'default' | 'detail' | 'relative';

export function formatDateByType(
  isoString: string,
  type: DateFormatType,
): string {
  switch (type) {
    case 'default':
      return formatDefaultDate(isoString);
    case 'detail':
      return formatDetailDate(isoString);
    case 'relative':
      return formatRelativeDate(isoString);
    default:
      return formatDefaultDate(isoString);
  }
}

// 기본 날짜 표기
function formatDefaultDate(isoString: string): string {
  const date = new ImmutableDate(isoString);
  return date.format('yyyy.MM.dd');
}

// 기록 상세 페이지 표기
function formatDetailDate(isoString: string): string {
  const date = new ImmutableDate(isoString);
  return date.format('yy.MM.dd HH:mm');
}

// 댓글·방문 기록용 상대 시간 표기
function formatRelativeDate(isoString: string): string {
  const target = new ImmutableDate(isoString);
  const now = new ImmutableDate();

  if (now.differenceInDays(target) < 1) {
    if (now.differenceInMinutes(target) < 1) {
      return '방금 전';
    }
    if (now.differenceInHours(target) < 1) {
      const minutes = now.differenceInMinutes(target);
      return `${minutes}분 전`;
    }
    const hours = now.differenceInHours(target);
    return `${hours}시간 전`;
  }

  if (now.differenceInWeeks(target) < 1) {
    const days = now.differenceInDays(target);
    if (days === 1) return '어제';
    return `${days}일 전`;
  }

  if (now.differenceInWeeks(target) < 4) {
    const weeks = now.differenceInWeeks(target);
    return `${weeks}주 전`;
  }

  const targetYear = target.getFullYear();
  const nowYear = now.getFullYear();

  const month = target.getMonth();
  const day = target.getDate();

  if (targetYear === nowYear) {
    return `${month}월 ${day}일`;
  } else {
    return `${targetYear}년 ${month}월 ${day}일`;
  }
}
