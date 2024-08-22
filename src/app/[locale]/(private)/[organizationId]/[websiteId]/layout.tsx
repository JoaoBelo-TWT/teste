import { Structure } from './components/wrappers/structure';

export default function DashboardLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { organizationId: string; websiteId: string; dashboardId: string };
}>) {
  return (
    <Structure organizationId={params.organizationId} websiteId={params.websiteId}>
      {children}
    </Structure>
  );
}
