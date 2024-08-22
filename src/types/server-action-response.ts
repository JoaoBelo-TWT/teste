export interface ServerActionResponse<T> {
  data?: T;
  successMessage?: string;
  errorMessage?: string;
  warningMessage?: string;
}
