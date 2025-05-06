import { z } from 'zod';

export const searchSchema = z.object({
  query: z
    .string()
    .min(1, '검색하실 내용을 입력해주세요.')
    .min(2, '최소 2글자부터 검색 가능합니다.')
    .max(25, '최대 25자까지 입력 가능합니다.')
    .regex(/^[가-힣a-zA-Z0-9\s]*$/, '특수문자는 입력할 수 없습니다.'),
});

export type SearchSchema = z.infer<typeof searchSchema>;

export interface SearchBarProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}
