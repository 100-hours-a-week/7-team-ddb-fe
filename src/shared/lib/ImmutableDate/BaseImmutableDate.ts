export interface BaseImmutableDate {
  getKSTDate: () => Date;
  format: (format: string) => string;
  getFullYear: () => number;
  getMonth: () => number;
  getDate: () => number;
  differenceInMinutes: (date: BaseImmutableDate) => number;
  differenceInHours: (date: BaseImmutableDate) => number;
  differenceInDays: (date: BaseImmutableDate) => number;
  differenceInWeeks: (date: BaseImmutableDate) => number;
}
