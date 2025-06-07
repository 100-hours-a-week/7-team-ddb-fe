'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState, useEffect } from 'react';
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
import { useImageUpload } from '@/shared/hooks';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

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
  const [preview, setPreview] = useState<string | null>(
    defaultValues?.profile_image || null,
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const {
    uploadImage,
    isLoading: isUploadingImage,
    error: imageUploadError,
  } = useImageUpload();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: defaultValues?.username || '',
      introduction: defaultValues?.introduction || '',
      profile_image: defaultValues?.profile_image || '',
    },
  });

  useEffect(() => {
    if (defaultValues?.profile_image) {
      setPreview(defaultValues.profile_image);
      setSelectedFile(null);
      form.setValue('profile_image', defaultValues.profile_image);
    }
  }, [defaultValues?.profile_image, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    form.clearErrors('profile_image');
    setImageUploadError(null);

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        form.setError('profile_image', {
          type: 'manual',
          message: `프로필 사진은 ${MAX_FILE_SIZE / 1024 / 1024}MB 이하만 가능합니다.`,
        });
        setSelectedFile(null);
        setPreview(defaultValues?.profile_image || null);
        return;
      }
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        form.setError('profile_image', {
          type: 'manual',
          message:
            '프로필 사진은 .jpg, .jpeg, .png, .webp 확장자만 가능합니다.',
        });
        setSelectedFile(null);
        setPreview(defaultValues?.profile_image || null);
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreview(defaultValues?.profile_image || null);
    }
  };

  const setImageUploadError = (error: Error | null) => {
    if (error) {
      form.setError('profile_image', {
        type: 'manual',
        message: error.message || '이미지 업로드 실패',
      });
    } else {
      form.clearErrors('profile_image');
    }
  };

  const handleFormSubmit = async (data: ProfileFormValues) => {
    setIsSubmittingForm(true);
    setImageUploadError(null);

    let finalProfileImageUrl = data.profile_image;

    if (selectedFile) {
      const uploadedUrl = await uploadImage(selectedFile, 'profile');
      if (uploadedUrl) {
        finalProfileImageUrl = uploadedUrl;
      } else {
        if (imageUploadError) {
          form.setError('profile_image', {
            type: 'manual',
            message:
              imageUploadError.message ||
              '이미지 업로드 중 문제가 발생했습니다.',
          });
        }
        setIsSubmittingForm(false);
        return;
      }
    }

    try {
      await onSubmit({ ...data, profile_image: finalProfileImageUrl });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  useEffect(() => {
    if (imageUploadError && !selectedFile) {
      setImageUploadError(imageUploadError);
    }
  }, [imageUploadError, form, selectedFile]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="mx-auto flex w-full max-w-sm flex-col items-center space-y-8 py-6"
      >
        <div className="relative">
          <div
            onClick={() => !isSubmittingForm && inputRef.current?.click()}
            className={`h-32 w-32 overflow-hidden rounded-full border-2 bg-gray-200 ${
              isSubmittingForm
                ? 'cursor-not-allowed opacity-70'
                : 'cursor-pointer'
            } ${form.formState.errors.profile_image ? 'border-destructive' : 'border-gray-300'}`}
          >
            {preview ? (
              <img
                src={preview}
                alt="프로필 이미지"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-500">
                {isSubmittingForm && isUploadingImage
                  ? '업로드중...'
                  : '사진 선택'}
              </div>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_IMAGE_TYPES.join(',')}
            className="hidden"
            onChange={handleImageChange}
            disabled={isSubmittingForm}
          />
        </div>
        {form.formState.errors.profile_image?.message && (
          <p className="text-destructive text-sm font-medium">
            {form.formState.errors.profile_image?.message}
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
            ? isUploadingImage
              ? '이미지 업로드 중'
              : '저장 중'
            : buttonText}
        </Button>
      </form>
    </Form>
  );
}
