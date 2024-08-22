import { AuthUnprotectedRoutes } from '@/components/wrappers/auth-unprotected-routes';

export default function PublicLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthUnprotectedRoutes>{children}</AuthUnprotectedRoutes>;
}
