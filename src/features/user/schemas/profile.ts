import { z } from 'zod';

export const profileSchema = z.object({
  profile_image: z.string().optional(),
  username: z
    .string()
    .min(2, '2자 이상 입력해주세요')
    .max(10, '10자 이하로 입력해주세요')
    .regex(/^[가-힣a-zA-Z0-9\s]+$/, '특수문자는 사용할 수 없습니다')
    .trim(),
  introduction: z.string().max(70, '70자 이하로 입력해주세요').optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
