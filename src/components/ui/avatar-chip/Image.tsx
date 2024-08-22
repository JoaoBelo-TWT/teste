import classes from './index.module.css';

export const AvatarImage = (props: { alt: string }) => (
  <img width={'100%'} height={'100%'} className={classes['avatar-chip__image']} {...props} alt={props.alt} />
);
