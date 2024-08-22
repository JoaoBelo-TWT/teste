import React from 'react';

type AuthUnprotectedRoutesProps = {
  children: React.ReactNode;
};

export function AuthUnprotectedRoutes({ children }: Readonly<AuthUnprotectedRoutesProps>) {
  return <>{children}</>;
}
