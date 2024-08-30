export const dynamic = 'force-dynamic';

export default function ExecutiveDashboardLayout({
  children,
  channelPerformance,
  funnelPerformance,
  websitePerformance,
  campaignPerformance,
  acquisitionPerformance
}: Readonly<{
  children: React.ReactNode;
  channelPerformance: React.ReactNode;
  funnelPerformance: React.ReactNode;
  websitePerformance: React.ReactNode;
  campaignPerformance: React.ReactNode;
  acquisitionPerformance: React.ReactNode;
}>) {
  return (
    <>
      {channelPerformance}
      {acquisitionPerformance}
      {funnelPerformance}
      {websitePerformance}
      {campaignPerformance}
      {children}
    </>
  );
}
