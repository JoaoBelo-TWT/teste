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

interface getInboxTeamInviteResponse extends Array<EmailResponse> {}

function extractVerificationURL(body: EmailResponse) {
  const { body_text } = body;

  const teamInvitationUrlRegex = /https?:\/\/dashboard(-develop)?\.source\.app\/team-invitation\?.+/g;

  const url = body_text.match(teamInvitationUrlRegex);
  return url ? url[0] : null;
}

export async function getInboxTeamInvite({ email }: { email: string }): Promise<string | null> {
  let gotHtml = false;
  let response = [] as getInboxTeamInviteResponse;
  let attempts = 0;

  while (!gotHtml && attempts < 15) {
    const axiosResponse = await axios.get<getInboxTeamInviteResponse>(
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
