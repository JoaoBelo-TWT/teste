import dayjs from 'dayjs';

import EditableDetailsList from '@/components/lists/editable-details';
import { getQueryWebsite } from '@/lib/react-query/website/query-website';

export default async function WebsiteDetailsList({ params }: Readonly<{ params: { websiteId: string } }>) {
  const websiteData = await getQueryWebsite(params.websiteId);

  /* eslint-disable i18next/no-literal-string */
  const mockDetailList = [
    { label: 'Name', value: websiteData?.website.name, isEditable: true },
    { label: 'Thumbnail Image', value: 'Source' },
    { label: 'Organization', value: websiteData?.website.organizationId },
    { label: 'Website URL', value: websiteData?.website.domain, isEditable: true },
    { label: 'Created By', value: `${websiteData?.website.user?.firstName} ${websiteData?.website.user?.lastName}` },
    { label: 'Date Created', value: dayjs(websiteData?.website.createdAt).format('YYYY-MM-DD') }
  ];

  return <EditableDetailsList details={mockDetailList} />;
}
