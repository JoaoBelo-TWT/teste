'use client';

import { toaster } from '@/components/ui/toast';
import { ServerActionResponse } from '@/types/server-action-response';

interface ShowResponseToastProps {
  response: ServerActionResponse<unknown>;
  showSuccessMessages?: boolean;
  successMessage?: string;
}

export function showResponseToast({ response, successMessage, showSuccessMessages = false }: ShowResponseToastProps) {
  if ((response?.successMessage || successMessage) && showSuccessMessages) {
    toaster.success({
      title: successMessage ?? response.successMessage ?? ''
    });
  } else if (response?.errorMessage) {
    toaster.error({
      title: response.errorMessage
    });
  }
}
