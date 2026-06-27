export interface PresignedUploadOptions {
  key: string;
  contentType: string;
  expiresIn?: number;
}

export interface PresignedUploadResponse {
  key: string;
  uploadUrl: string;
  expiresIn: number;
}