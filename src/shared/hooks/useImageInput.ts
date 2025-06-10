import { useState, useRef, useEffect, useCallback } from 'react';
import type { UseFormReturn, FieldValues, Path } from 'react-hook-form';

import { UploadType } from '../types';

import { useImageUpload } from './useImageUpload';

interface UseImageInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  fieldName: Path<T>;
  defaultImage?: string | string[] | null;
  uploadType: UploadType;
  maxSize?: number;
  acceptedTypes?: string[];
  multiple?: boolean;
}

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024; // 5MB
const DEFAULT_ACCEPTED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export function useImageInput<T extends FieldValues>({
  form,
  fieldName,
  defaultImage = null,
  uploadType,
  maxSize = DEFAULT_MAX_SIZE,
  acceptedTypes = DEFAULT_ACCEPTED_TYPES,
  multiple = false,
}: UseImageInputProps<T>) {
  const [preview, setPreview] = useState<string | string[] | null>(
    defaultImage,
  );
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    uploadImage,
    isLoading: isUploading,
    error: uploadError,
    setError: setUploadError,
  } = useImageUpload();

  useEffect(() => {
    setPreview(defaultImage);
  }, [defaultImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    form.clearErrors(fieldName);
    setUploadError(null);

    if (files.length === 0) {
      setSelectedFiles([]);
      setPreview(defaultImage);
      return;
    }

    if (!multiple && files.length > 1) {
      form.setError(fieldName, {
        type: 'manual',
        message: '하나의 이미지만 선택할 수 있습니다.',
      });
      return;
    }

    const validationError = files.some((file) => {
      if (file.size > maxSize) {
        form.setError(fieldName, {
          type: 'manual',
          message: `이미지는 ${maxSize / 1024 / 1024}MB 이하만 가능합니다.`,
        });
        return true;
      }
      if (!acceptedTypes.includes(file.type)) {
        form.setError(fieldName, {
          type: 'manual',
          message: `이미지는 ${acceptedTypes.join(', ')} 형식만 가능합니다.`,
        });
        return true;
      }
      return false;
    });

    if (validationError) {
      setSelectedFiles([]);
      setPreview(defaultImage);
      return;
    }

    setSelectedFiles(files);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreview(multiple ? newPreviews : newPreviews[0]);
  };

  const triggerInput = () => inputRef.current?.click();

  const upload = useCallback(async () => {
    if (selectedFiles.length === 0) {
      return defaultImage;
    }

    try {
      if (multiple) {
        const uploadedUrls = await Promise.all(
          selectedFiles.map((file) => uploadImage(file, uploadType)),
        );
        const successfulUrls = uploadedUrls.filter(
          (url): url is string => url !== null,
        );

        if (successfulUrls.length !== selectedFiles.length) {
          throw new Error('일부 이미지 업로드에 실패했습니다.');
        }

        form.setValue(fieldName, successfulUrls as T[Path<T>]);
        return successfulUrls;
      } else {
        const uploadedUrl = await uploadImage(selectedFiles[0], uploadType);
        if (uploadedUrl) {
          form.setValue(fieldName, uploadedUrl as T[Path<T>]);
          return uploadedUrl;
        }
        throw new Error('이미지 업로드에 실패했습니다.');
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : '이미지 업로드 중 문제가 발생했습니다.';
      form.setError(fieldName, { type: 'manual', message });
      return null;
    }
  }, [
    selectedFiles,
    uploadImage,
    uploadType,
    form,
    fieldName,
    defaultImage,
    multiple,
  ]);

  useEffect(() => {
    return () => {
      if (Array.isArray(preview)) {
        preview.forEach((p) => URL.revokeObjectURL(p));
      } else if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return {
    preview,
    isUploading,
    uploadError,
    inputRef,
    acceptedTypes,
    multiple,
    handleImageChange,
    triggerInput,
    upload,
  };
}
