/* eslint-disable i18next/no-literal-string */
import axios from 'axios';

interface NewDisposableEmail {
  email: string;
  token: string;
}
interface NewDisposableEmailDataResponse {
  data: NewDisposableEmail;
}
export async function newDisposableEmail(): Promise<string> {
  const response: NewDisposableEmailDataResponse = await axios.post(
    'https://api.internal.temp-mail.io/api/v3/email/new',
    {
      min_name_length: 10,
      max_name_length: 10
    }
  );

  return response.data.email;
}
