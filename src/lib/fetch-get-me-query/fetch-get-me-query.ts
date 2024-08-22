import { getAccessToken } from '@auth0/nextjs-auth0/edge';

import { GetMeQuery } from '@/__generated__/graphql';

interface ResponseData {
  data: GetMeQuery;
}

export async function fetchGetMeQuery(): Promise<GetMeQuery | null> {
  try {
    const accessTOKEN = (await getAccessToken())?.accessToken;
    const graphqlUrl = new URL('/graphql', process.env.NEXT_PUBLIC_SOURCE_API_URL).toString();

    const queryBody = JSON.stringify({
      query: `{
        me {
          id
          email
          firstName
          lastName
          companyRoleId
          companyIndustryId
          companySizeId
          defaultOrganizationId
          currentOnboardingPath
          createdAt
          updatedAt
          permissions {
            organizationId
            accessLevel
            dashboardId
            websiteId
          }
        }
      }`
    });

    const result = await fetch(graphqlUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessTOKEN}`,
        'Content-Type': `application/json`
      },
      body: queryBody,
      cache: 'default',
      next: {
        revalidate: 3000
      }
    });

    const queryData = (await result?.json()) as ResponseData;

    return queryData.data ?? undefined;

  } catch (error) {
    return null;
  }
}
