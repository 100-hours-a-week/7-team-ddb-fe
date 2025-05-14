// /api/v1/auth/oauth 응답 타입
export interface OAuthRedirectResponse {
  redirect_url: string;
}

// /api/v1/auth/tokens 요청 바디 타입
export interface TokensRequestBody {
  authorization_code: string;
}

// /api/v1/auth/tokens 성공 응답 데이터 타입
export interface AuthTokens {
  access_token: string;
  expires_in: number;
  new_user: boolean;
  refresh_token: string | null;
  token_type: 'Bearer';
  user: {
    id: string;
    location_agreed: boolean;
    privacy_agreed: boolean;
    profile_completed: boolean;
    profile_image_url: string | null;
    provider: 'KAKAO';
    username: string;
  };
}

// /api/v1/auth/tokens 성공 응답 전체 (message 포함)
// fetchApi가 data만 반환하므로, message는 직접 다루지 않지만 참고용
export interface AuthTokensApiResponse {
  message: 'login_success';
  data: AuthTokens;
}
