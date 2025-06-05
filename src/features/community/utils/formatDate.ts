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

function padZero(num: number, length = 2): string {
  return num.toString().padStart(length, '0');
}

// 기본 날짜 표기
function formatDefaultDate(isoString: string): string {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());

  return `${year}.${month}.${day}`;
}

// 기록 상세 페이지 표기
function formatDetailDate(isoString: string): string {
  const date = new Date(isoString);
  const fullYear = date.getFullYear().toString();
  const yy = fullYear.slice(-2);
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());

  return `${yy}.${month}.${day} ${hours}:${minutes}`;
}

// 댓글·방문 기록용 상대 시간 표기
function formatRelativeDate(isoString: string): string {
  const now = new Date();
  const target = new Date(isoString);

  const diffMs = now.getTime() - target.getTime();
  if (diffMs < 0) {
    return formatDefaultDate(isoString);
  }

  const minuteMs = 60 * 1000;
  const hourMs = 60 * minuteMs;
  const dayMs = 24 * hourMs;
  const weekMs = 7 * dayMs;
  const fourWeeksMs = 4 * weekMs;

  if (diffMs < dayMs) {
    if (diffMs < minuteMs) {
      return '방금 전';
    }
    if (diffMs < hourMs) {
      const minutes = Math.floor(diffMs / minuteMs);
      return `${minutes}분 전`;
    }

    const hours = Math.floor(diffMs / hourMs);
    return `${hours}시간 전`;
  }

  if (diffMs < weekMs) {
    const days = Math.floor(diffMs / dayMs);
    if (days === 1) {
      return '어제';
    }

    return `${days}일 전`;
  }

  if (diffMs < fourWeeksMs) {
    const weeks = Math.floor(diffMs / weekMs);
    return `${weeks}주 전`;
  }

  const targetYear = target.getFullYear();
  const nowYear = now.getFullYear();

  const month = target.getMonth() + 1;
  const day = target.getDate();

  if (targetYear === nowYear) {
    return `${month}월 ${day}일`;
  } else {
    return `${targetYear}년 ${month}월 ${day}일`;
  }
}
