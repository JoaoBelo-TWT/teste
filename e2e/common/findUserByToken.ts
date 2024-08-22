/* eslint-disable i18next/no-literal-string */
import axios from 'axios';

interface UsersResponse {
  data: {
    data: User;
  };
}

interface User {
  me: MeParams;
}

interface MeParams {
  id: string;
}

export async function findUserByToken({ token }: { token: string }): Promise<User> {
  const apiUrl = `${process.env.NEXT_PUBLIC_SOURCE_API_URL}/graphql` || '';

  const users: UsersResponse = await axios.post(
    apiUrl,
    {
      query: `query {
        me {
          id
        }
      }
      `
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return users?.data?.data;
}
