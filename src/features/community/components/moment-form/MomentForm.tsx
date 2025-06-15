'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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
  formRef: React.RefObject<HTMLFormElement | null>;
  isSubmittingForm: boolean;
  onSubmit: (data: MomentFormValues) => Promise<void>;
  defaultValues?: Partial<MomentFormValues>;
}

export function MomentForm({
  formRef,
  isSubmittingForm,
  onSubmit,
  defaultValues,
}: MomentFormProps) {
  const form = useForm<MomentFormValues>({
    resolver: zodResolver(momentSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      content: defaultValues?.content || '',
      place_id: defaultValues?.place_id || undefined,
      place_name: defaultValues?.place_name || undefined,
      images: defaultValues?.images || [],
      is_public: defaultValues?.is_public || false,
    },
  });

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center space-y-8 px-6 py-6"
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
                maxLength={50}
                {...field}
                className="input-text"
                disabled={isSubmittingForm}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {defaultValues?.place_id && (
          <FormField
            control={form.control}
            name="place_id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="heading-2">장소</FormLabel>
                <Input
                  placeholder="장소를 입력하세요"
                  {...field}
                  value={defaultValues.place_name}
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
