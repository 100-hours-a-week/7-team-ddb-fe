'use client';

import React from 'react';

interface ProfileImageInputProps {
  preview: string | null;
  isUploading: boolean;
  triggerInput: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  acceptedTypes: string[];
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
  isSubmitting: boolean;
  errorMessage?: string;
  isError: boolean;
  shape?: 'circle' | 'square';
  altText?: string;
  placeholderText?: string;
  className?: string;
  previewClassName?: string;
}

export function ProfileImageInput({
  preview,
  isUploading,
  triggerInput,
  inputRef,
  acceptedTypes,
  handleImageChange,
  multiple = false,
  isSubmitting,
  errorMessage,
  isError,
  shape = 'circle',
  altText = '이미지 프리뷰',
  placeholderText = '사진 선택',
  className,
  previewClassName = 'h-32 w-32',
}: ProfileImageInputProps) {
  const renderSinglePreview = (src: string) => (
    <img src={src} alt={altText} className="h-full w-full object-cover" />
  );

  const renderPlaceholder = () => (
    <div className="flex h-full w-full items-center justify-center text-center text-gray-500">
      {isUploading ? '업로드중...' : placeholderText}
    </div>
  );

  const renderPreview = () => {
    if (typeof preview === 'string') {
      return renderSinglePreview(preview);
    }
    return renderPlaceholder();
  };

  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-md';
  const interactionClass = isSubmitting
    ? 'cursor-not-allowed opacity-70'
    : 'cursor-pointer';
  const borderClass = isError ? 'border-destructive' : 'border-gray-300';

  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      <div
        onClick={() => !isSubmitting && triggerInput()}
        className={`relative overflow-hidden border-2 bg-gray-200 ${previewClassName} ${shapeClass} ${interactionClass} ${borderClass}`}
      >
        {renderPreview()}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        multiple={multiple}
        className="hidden"
        onChange={handleImageChange}
        disabled={isSubmitting}
      />
      {errorMessage && (
        <p className="text-destructive text-sm font-medium">{errorMessage}</p>
      )}
    </div>
  );
}
