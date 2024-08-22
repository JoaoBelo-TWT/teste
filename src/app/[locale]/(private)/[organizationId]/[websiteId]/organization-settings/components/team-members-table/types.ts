import { AccessLevel, MembersInvitationStatus } from '@/__generated__/graphql';

export type TeamMembersRowData = {
  id: string;
  permissionId?: string;
  name: string;
  email: string;
  accessLevel: AccessLevel;
  status?: MembersInvitationStatus;
};
