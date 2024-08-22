/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-await-in-loop */
import axios from 'axios';

interface EmailResponse {
  id: string;
  from: string;
  to: string;
  cc: string | null;
  subject: string;
  body_text: string;
  body_html: string;
  created_at: string;
  attachments: [];
}

interface getInboxVerificationEmailResponse extends Array<EmailResponse> {}

function extractVerificationURL(body: EmailResponse) {
  const { body_text } = body;

  const verificationUrlRegex = /https?:\/\/source-app(-dev)?\.us\.auth0\.com\/u\/email-verification\?ticket=[^\s#]+/g;

  const url = body_text.match(verificationUrlRegex);
  return url ? url[0] : null;
}

export async function getInboxVerificationEmail({ email }: { email: string }): Promise<string | null> {
  let gotHtml = false;
  let response = [] as getInboxVerificationEmailResponse;
  let attempts = 0;

  while (!gotHtml && attempts < 25) {
    const axiosResponse = await axios.get<getInboxVerificationEmailResponse>(
      `https://api.internal.temp-mail.io/api/v3/email/${email}/messages`
    );
    response = axiosResponse.data;
    if (!response[0]) {
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      }); // wait for 2 seconds
    } else {
      gotHtml = true;
    }
    attempts += 1;
  }

  return gotHtml ? extractVerificationURL(response[0]) : null;
}
