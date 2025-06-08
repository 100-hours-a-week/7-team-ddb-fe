'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { ProfileFormValues, profileSchema } from '../../schemas';

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
import { useImageInput } from '@/shared/hooks';

export interface ProfileFormProps {
  onSubmit: (data: ProfileFormValues) => Promise<void>;
  defaultValues?: Partial<ProfileFormValues>;
  buttonText?: string;
}

export function ProfileForm({
  onSubmit,
  defaultValues,
  buttonText = '저장',
}: ProfileFormProps) {
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: defaultValues?.username || '',
      introduction: defaultValues?.introduction || '',
      profile_image: defaultValues?.profile_image || '',
    },
  });

  const {
    preview,
    isUploading,
    inputRef,
    acceptedTypes,
    handleImageChange,
    triggerInput,
    upload,
  } = useImageInput({
    form,
    fieldName: 'profile_image',
    defaultImage: defaultValues?.profile_image,
    uploadType: 'profile',
  });

  const handleFormSubmit = async (data: ProfileFormValues) => {
    setIsSubmittingForm(true);

    const uploadedImageUrl = await upload();

    if (uploadedImageUrl !== null) {
      try {
        await onSubmit({
          ...data,
          profile_image: uploadedImageUrl as string,
        });
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }

    setIsSubmittingForm(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="mx-auto flex w-full max-w-sm flex-col items-center space-y-8 py-6"
      >
        <div className="relative">
          <div
            onClick={() => !isSubmittingForm && triggerInput()}
            className={`h-32 w-32 overflow-hidden rounded-full border-2 bg-gray-200 ${
              isSubmittingForm
                ? 'cursor-not-allowed opacity-70'
                : 'cursor-pointer'
            } ${form.formState.errors.profile_image ? 'border-destructive' : 'border-gray-300'}`}
          >
            {preview ? (
              <img
                src={preview as string}
                alt="프로필 이미지"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-500">
                {isSubmittingForm && isUploading ? '업로드중...' : '사진 선택'}
              </div>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept={acceptedTypes.join(',')}
            className="hidden"
            onChange={handleImageChange}
            disabled={isSubmittingForm}
          />
        </div>
        {form.formState.errors.profile_image?.message && (
          <p className="text-destructive text-sm font-medium">
            {form.formState.errors.profile_image?.message as string}
          </p>
        )}

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="heading-2">닉네임</FormLabel>
              <Input
                placeholder="닉네임을 입력하세요"
                maxLength={10}
                {...field}
                className="input-text"
                disabled={isSubmittingForm}
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
                maxLength={70}
                {...field}
                className="input-text"
                disabled={isSubmittingForm}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="h-10 w-full"
          disabled={isSubmittingForm}
        >
          {isSubmittingForm
            ? isUploading
              ? '이미지 업로드 중'
              : '저장 중'
            : buttonText}
        </Button>
      </form>
    </Form>
  );
}
