export const getImageSize = (base64: string): number => {
  // Remove the base64 prefix if it exists
  const base64String: string = base64.split(',')[1] || base64;

  // Calculate the length of the base64 string
  const base64Length: number = base64String.length;

  // Each base64 character represents 6 bits (3 bytes = 4 base64 characters)
  // Calculate the size in bytes
  const sizeInBytes: number = (base64Length * 3) / 4;

  // Convert bytes to megabytes (1 MB = 1048576 bytes)
  const sizeInMB: number = sizeInBytes / 1048576;

  return sizeInMB; // Return size in MB with 2 decimal points
};
