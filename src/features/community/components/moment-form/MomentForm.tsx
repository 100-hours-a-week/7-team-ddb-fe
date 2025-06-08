'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { MomentFormValues, momentSchema } from '../../schemas';

import { MomentImagesInput } from './MomentImagesInput';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@/shared/components';

export interface MomentFormProps {
  onSubmit: (data: MomentFormValues) => Promise<void>;
  defaultValues?: Partial<MomentFormValues>;
  placeInfo?: {
    place_id: string;
    place_name: string;
  };
}

export function MomentForm({
  onSubmit,
  defaultValues,
  placeInfo,
}: MomentFormProps) {
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const form = useForm<MomentFormValues>({
    resolver: zodResolver(momentSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      content: defaultValues?.content || '',
      place_id: defaultValues?.place_id || '',
      place_name: defaultValues?.place_name || '',
      images: defaultValues?.images || [],
      is_public: defaultValues?.is_public || false,
    },
  });

  const handleFormSubmit = async (data: MomentFormValues) => {
    setIsSubmittingForm(true);

    try {
      await onSubmit({ ...data });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="mx-auto flex w-full max-w-sm flex-col items-center space-y-8 py-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="heading-2">
                제목
                <span className="text-red-500">*</span>
              </FormLabel>
              <Input
                placeholder="제목을 입력하세요"
                maxLength={10}
                {...field}
                className="input-text"
                disabled={isSubmittingForm}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {placeInfo && (
          <FormField
            control={form.control}
            name="place_id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="heading-2">장소</FormLabel>
                <Input
                  placeholder="장소를 입력하세요"
                  {...field}
                  value={placeInfo.place_name}
                  disabled
                />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="heading-2">
                내용
                <span className="text-red-500">*</span>
              </FormLabel>
              <Textarea
                placeholder="오늘의 일상을 기록해주세요"
                maxLength={2200}
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
          name="images"
          render={({ field: { value, onChange } }) => (
            <FormItem className="w-full">
              <FormLabel className="heading-2">이미지</FormLabel>
              <MomentImagesInput
                images={value}
                onChange={onChange}
                disabled={isSubmittingForm}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
