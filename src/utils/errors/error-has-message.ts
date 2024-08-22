export function errorHasMessage(error: unknown, message: string) {
  return (
    !!error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string' &&
    error.message.includes(message)
  );
}
