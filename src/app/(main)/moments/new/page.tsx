'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';

import {
  HeaderCheckButton,
  HeaderVisibilityToggle,
  MomentForm,
  MomentFormValues,
  postMoment,
} from '@/features/community';
import { Header } from '@/shared/components';
import { useImageUpload, useToast } from '@/shared/hooks';

export default function NewMomentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const placeId = searchParams.get('placeId');
  const placeName = searchParams.get('placeName');

  const { showErrorToast } = useToast();
  const { uploadImage } = useImageUpload();

  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (data: MomentFormValues) => {
    setIsSubmittingForm(true);
    try {
      const imageUrls: string[] = [];
      if (data.images && data.images.length > 0) {
        const uploadPromises = data.images.map(async (image) => {
          if (typeof image === 'string') {
            return image;
          }
          const objectUrl = await uploadImage(image, 'moment');
          if (!objectUrl) {
            throw new Error(`이미지 업로드 실패: ${image.name}`);
          }
          return objectUrl;
        });
        const resolvedUrls = await Promise.all(uploadPromises);
        imageUrls.push(...resolvedUrls);
      }

      const { id } = await postMoment({
        ...data,
        place_id: placeId ? parseInt(placeId) : undefined,
        place_name: placeName ?? undefined,
        images: imageUrls,
        is_public: isPublic,
      });
      router.replace(`/moments/${id}`);
    } catch (error) {
      console.error(error);
      showErrorToast('기록 생성에 실패했습니다.');
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <div className="overflow-y-auto pb-22">
      <Header
        showBackButton
        rightElement={
          <div className="flex flex-row items-center gap-4">
            <HeaderVisibilityToggle
              isPublic={isPublic}
              onToggle={setIsPublic}
            />
            <HeaderCheckButton
              onClick={() => formRef.current?.requestSubmit()}
              disabled={isSubmittingForm}
            />
          </div>
        }
      />
      <MomentForm
        formRef={formRef}
        isSubmittingForm={isSubmittingForm}
        onSubmit={handleSubmit}
        defaultValues={{
          place_id: placeId ? parseInt(placeId) : undefined,
          place_name: placeName ?? undefined,
        }}
      />
    </div>
  );
}
