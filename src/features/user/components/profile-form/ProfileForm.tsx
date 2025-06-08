'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { ProfileFormValues, profileSchema } from '../../schemas';

import { ProfileImageInput } from './ProfileImageInput';

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
        <ProfileImageInput
          preview={typeof preview === 'string' ? preview : null}
          isUploading={isUploading}
          triggerInput={triggerInput}
          inputRef={inputRef}
          acceptedTypes={acceptedTypes}
          handleImageChange={handleImageChange}
          isSubmitting={isSubmittingForm}
          errorMessage={form.formState.errors.profile_image?.message as string}
          isError={!!form.formState.errors.profile_image}
          altText="프로필 이미지"
        />
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
