'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@/shared/components';

const profileSchema = z.object({
  profileImage: z.string().optional(),
  nickname: z.string().min(2, '2자 이상 입력해주세요').max(20),
  introduction: z.string().max(100).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export interface ProfileFormProps {
  defaultValues: Partial<ProfileFormValues>;
  buttonText?: string;
}

export function ProfileForm({
  defaultValues,
  buttonText = '저장',
}: ProfileFormProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        form.setValue('profileImage', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: ProfileFormValues) => {
    console.log('제출 데이터', data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-sm flex-col items-center space-y-8 py-6"
      >
        <div className="relative">
          <div
            onClick={() => inputRef.current?.click()}
            className="h-32 w-32 cursor-pointer overflow-hidden rounded-full border-2 border-gray-300 bg-gray-200"
          >
            {preview || defaultValues.profileImage ? (
              <img
                src={
                  preview || (defaultValues.profileImage as unknown as string)
                }
                alt="프로필 이미지"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-500">
                사진 선택
              </div>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="heading-2">닉네임</FormLabel>
              <Input
                placeholder="닉네임을 입력하세요"
                {...field}
                className="input-text"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="introduction"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="heading-2">소개글</FormLabel>
              <Textarea
                placeholder="간단한 소개를 입력하세요"
                {...field}
                className="input-text"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="h-10 w-full">
          {buttonText}
        </Button>
      </form>
    </Form>
  );
}
