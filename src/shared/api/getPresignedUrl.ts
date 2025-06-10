import { fetchApi } from '../lib/fetchApi';
import { UploadType } from '../types';

interface PresignedUrlRequestBody {
  file_name: string;
  content_type: string;
  upload_type: UploadType;
}

export interface PresignedUrlResponseData {
  signed_url: string;
  object_url: string;
  expires_in: number;
}

/**
 * 이미지 업로드용 Presigned URL을 발급받는 함수
 * @param fileName 업로드할 파일명 (예: "image.jpg")
 * @param contentType 파일의 MIME 타입 (예: "image/jpeg")
 * @param uploadType 업로드 타입 (현재는 "profile"만 지원 가정)
 * @returns Promise<PresignedUrlResponseData> - Presigned URL 정보
 * @throws FetchApiError - API 요청 실패 시
 */
export async function getPresignedUrl(
  fileName: string,
  contentType: string,
  uploadType: UploadType,
): Promise<PresignedUrlResponseData> {
  const requestBody: PresignedUrlRequestBody = {
    file_name: fileName,
    content_type: contentType,
    upload_type: uploadType,
  };

  return fetchApi<PresignedUrlResponseData>('/api/v1/gcs/presigned-urls', {
    method: 'POST',
    body: JSON.stringify(requestBody),
  });
}
