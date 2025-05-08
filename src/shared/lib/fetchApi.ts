/**
 * API 공통 응답 래퍼 인터페이스 (백엔드 응답 형식에 맞춤)
 */
interface ApiResponse<T = unknown> {
  message: string; // 성공 메시지 또는 에러 메시지/코드
  data: T | null; // 실제 데이터 또는 null
}

/**
 * 커스텀 에러 클래스
 */
export class FetchApiError extends Error {
  status: number;
  apiMessage: string;
  apiData: null;

  constructor(
    message: string,
    status: number,
    apiMessage: string,
    apiData: null,
  ) {
    super(message);
    this.name = 'FetchApiError';
    this.status = status;
    this.apiMessage = apiMessage;
    this.apiData = apiData;
    Object.setPrototypeOf(this, FetchApiError.prototype);
  }
}

/**
 * 백엔드 API와 통신하기 위한 범용 fetch 함수
 * @param endpoint API 엔드포인트 (예: '/users', '/products/1')
 * @param options fetch 옵션 (RequestInit 확장)
 * @returns Promise<T> - ApiResponse의 data 필드 (성공 시)
 * @throws FetchApiError - API 요청 실패 시
 */
export async function fetchApi<T = unknown>(
  endpoint: string,
  options: RequestInit = {
    method: 'GET',
  },
): Promise<T> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = `${apiBaseUrl}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${getAuthToken()}`,
  };

  const config: RequestInit = {
    ...options,
    credentials: 'include',
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  // 서버 컴포넌트 캐싱 옵션 (필요시 활성화)
  // if (typeof window === 'undefined' && !config.cache && !options.next) {
  //   config.next = { revalidate: 0 }; // 예: 매번 재검증 (SSR과 유사)
  // }

  console.log(`Fetching API: ${config.method || 'GET'} ${url}`);

  try {
    const response = await fetch(url, config);
    let responseBody: ApiResponse<T>;

    console.log('response', response);

    try {
      responseBody = await response.json();
    } catch (e) {
      console.error('Failed to parse JSON response:', e);
      throw new FetchApiError(
        'Failed to parse JSON response from server.',
        response.status,
        'invalid_json_response',
        null,
      );
    }

    if (!response.ok) {
      console.error(`API Error (status ${response.status}):`, responseBody);
      throw new FetchApiError(
        `API request failed: ${responseBody.message}`,
        response.status,
        responseBody.message,
        null,
      );
    }

    console.log(`API Success: ${responseBody.message}`, responseBody.data);
    return responseBody.data as T;
  } catch (error) {
    if (error instanceof FetchApiError) {
      throw error;
    }
    console.error('Network or unexpected error in fetchApi:', error);
    throw new FetchApiError(
      error instanceof Error
        ? error.message
        : 'An unexpected network error occurred',
      0,
      'unexpected_error',
      null,
    );
  }
}
