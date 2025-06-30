import {
  differenceInMinutes as fnsDifferenceInMinutes,
  differenceInHours as fnsDifferenceInHours,
  differenceInDays as fnsDifferenceInDays,
  differenceInWeeks as fnsDifferenceInWeeks,
} from 'date-fns';
import { toZonedTime, format as fnsFormatTz } from 'date-fns-tz';

const KST_TIMEZONE = 'Asia/Seoul';

import { BaseImmutableDate } from './BaseImmutableDate';

export class FnsImmutableDate implements BaseImmutableDate {
  private date: Date;

  constructor(date: Date | string = new Date()) {
    this.date = typeof date === 'string' ? new Date(date) : date;
  }

  getKSTDate(): Date {
    return toZonedTime(this.date, KST_TIMEZONE);
  }

  getFullYear(): number {
    return this.date.getFullYear();
  }

  getMonth(): number {
    return this.date.getMonth() + 1;
  }

  getDate(): number {
    return this.date.getDate();
  }

  format(format: string): string {
    return fnsFormatTz(this.date, format, { timeZone: KST_TIMEZONE });
  }

  differenceInMinutes(date: BaseImmutableDate): number {
    return fnsDifferenceInMinutes(this.getKSTDate(), date.getKSTDate());
  }

  differenceInHours(date: BaseImmutableDate): number {
    return fnsDifferenceInHours(this.getKSTDate(), date.getKSTDate());
  }

  differenceInDays(date: BaseImmutableDate): number {
    return fnsDifferenceInDays(this.getKSTDate(), date.getKSTDate());
  }

  differenceInWeeks(date: BaseImmutableDate): number {
    return fnsDifferenceInWeeks(this.getKSTDate(), date.getKSTDate());
  }
}
