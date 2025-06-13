import { z } from 'zod';

export const momentSchema = z.object({
  title: z
    .string()
    .min(2, '2자 이상 입력해주세요')
    .max(50, '50자 이하로 입력해주세요'),
  content: z
    .string()
    .min(1, '1자 이상 입력해주세요')
    .max(2200, '2200자 이하로 입력해주세요'),
  place_id: z.number().optional(),
  place_name: z.string().optional(),
  images: z.array(z.union([z.instanceof(File), z.string()])).optional(),
  is_public: z.boolean(),
});

export type MomentFormValues = z.infer<typeof momentSchema>;
