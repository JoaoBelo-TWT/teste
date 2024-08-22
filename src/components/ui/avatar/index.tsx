import { Avatar as MantineAvatar, type AvatarProps, AvatarGroupProps, AvatarGroup } from '@mantine/core';

import classes from './index.module.css';

export function Avatar({ children, ...props }: Readonly<AvatarProps>) {
  return (
    <MantineAvatar
      classNames={{ placeholder: classes.avatar__placeholder }}
      {...props}
      style={{ border: 0, ...props.style }}
    >
      {children}
    </MantineAvatar>
  );
}

const Group = (props: AvatarGroupProps) => <AvatarGroup {...props} />;

Avatar.Group = Group;
