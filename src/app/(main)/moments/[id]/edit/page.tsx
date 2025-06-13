'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import {
  getMomentById,
  HeaderCheckButton,
  HeaderVisibilityToggle,
  MomentForm,
  MomentFormValues,
  patchMoment,
} from '@/features/community';
import { FullScreenMessage, Header } from '@/shared/components';
import { useImageUpload, useToast } from '@/shared/hooks';

export default function EditMomentPage() {
  const { id } = useParams();
  const router = useRouter();

  const { showErrorToast, showSuccessToast } = useToast();
  const { uploadImage } = useImageUpload();

  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [defaultValues, setDefaultValues] =
    useState<Partial<MomentFormValues> | null>(null);

  useEffect(() => {
    const fetchMoment = async () => {
      try {
        const momentData = await getMomentById(Number(id));
        const formValues: Partial<MomentFormValues> = {
          title: momentData.title,
          content: momentData.content,
          images: momentData.images,
          is_public: momentData.isPublic,
          place_id: momentData.place?.id ?? undefined,
          place_name: momentData.place?.name ?? undefined,
        };
        setDefaultValues(formValues);
        setIsPublic(momentData.isPublic);
      } catch (err) {
        console.error('Failed to fetch moment:', err);
        showErrorToast('기록을 불러오는 데 실패했습니다.');
        router.back();
      }
    };

    fetchMoment();
  }, []);

  const handleSubmit = async (data: MomentFormValues) => {
    console.log('handleSubmit', data);
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

      await patchMoment({
        momentId: Number(id),
        data: {
          ...data,
          images: imageUrls,
          is_public: isPublic,
        },
      });
      showSuccessToast('기록이 수정되었습니다.');
      router.push(`/moments/${id}`);
    } catch (error) {
      console.error(error);
      showErrorToast('기록 수정에 실패했습니다.');
    } finally {
      setIsSubmittingForm(false);
    }
  };

  if (!defaultValues) {
    return <FullScreenMessage message="기록을 불러오는 중..." />;
  }

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
              onClick={() => {
                console.log('requestSubmit');
                formRef.current?.requestSubmit();
              }}
              disabled={isSubmittingForm}
            />
          </div>
        }
      />
      <MomentForm
        formRef={formRef}
        isSubmittingForm={isSubmittingForm}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      />
    </div>
  );
}
