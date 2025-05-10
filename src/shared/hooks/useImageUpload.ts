import { useState } from 'react';

import { getPresignedUrl, type PresignedUrlResponseData } from '@/shared/api';
import { FetchApiError } from '@/shared/lib/fetchApi';

export type UploadType = 'profile';

interface UseImageUploadResult {
  uploadImage: (file: File, uploadType: UploadType) => Promise<string | null>;
  isLoading: boolean;
  error: Error | null;
  uploadedObjectUrl: string | null;
}

export function useImageUpload(): UseImageUploadResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [uploadedObjectUrl, setUploadedObjectUrl] = useState<string | null>(
    null,
  );

  const uploadImage = async (
    file: File,
    uploadType: UploadType,
  ): Promise<string | null> => {
    setIsLoading(true);
    setError(null);
    setUploadedObjectUrl(null);

    try {
      const presignedData: PresignedUrlResponseData = await getPresignedUrl(
        file.name,
        file.type,
        uploadType,
      );

      const uploadResponse = await fetch(presignedData.signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error(
          `GCS 업로드 실패: ${uploadResponse.status} ${uploadResponse.statusText}`,
        );
      }

      setUploadedObjectUrl(presignedData.objectUrl);
      setIsLoading(false);
      return presignedData.objectUrl;
    } catch (err) {
      console.error('이미지 업로드 중 에러 발생:', err);
      if (err instanceof FetchApiError || err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('알 수 없는 에러가 발생했습니다.'));
      }
      setIsLoading(false);
      return null;
    }
  };

  return {
    uploadImage,
    isLoading,
    error,
    uploadedObjectUrl,
  };
}
