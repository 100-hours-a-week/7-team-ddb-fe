import { fetchApi } from '../lib/fetchApi';

interface PresignedUrlRequestBody {
  fileName: string;
  contentType: string;
  uploadType: 'profile';
}

export interface PresignedUrlResponseData {
  signedUrl: string;
  objectUrl: string;
  expiresIn: number;
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
  uploadType: 'profile',
): Promise<PresignedUrlResponseData> {
  const requestBody: PresignedUrlRequestBody = {
    fileName,
    contentType,
    uploadType,
  };

  return fetchApi<PresignedUrlResponseData>('/api/v1/gcs/presigned-urls', {
    method: 'POST',
    body: JSON.stringify(requestBody),
  });
}
