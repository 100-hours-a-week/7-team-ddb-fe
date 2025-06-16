import {
  differenceInMinutes as fnsDifferenceInMinutes,
  differenceInHours as fnsDifferenceInHours,
  differenceInDays as fnsDifferenceInDays,
  differenceInWeeks as fnsDifferenceInWeeks,
} from 'date-fns';
import { toZonedTime, format as fnsFormatTz } from 'date-fns-tz';

const KST_TIMEZONE = 'Asia/Seoul';

export function getKSTDate(date: string | Date = new Date()): Date {
  return toZonedTime(date, KST_TIMEZONE);
}

export function format(date: Date, formatString: string): string {
  return fnsFormatTz(date, formatString, { timeZone: KST_TIMEZONE });
}

export function differenceInMinutes(dateLeft: Date, dateRight: Date): number {
  return fnsDifferenceInMinutes(dateLeft, dateRight);
}

export function differenceInHours(dateLeft: Date, dateRight: Date): number {
  return fnsDifferenceInHours(dateLeft, dateRight);
}

export function differenceInDays(dateLeft: Date, dateRight: Date): number {
  return fnsDifferenceInDays(dateLeft, dateRight);
}

export function differenceInWeeks(dateLeft: Date, dateRight: Date): number {
  return fnsDifferenceInWeeks(dateLeft, dateRight);
}
