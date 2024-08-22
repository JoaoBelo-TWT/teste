import classes from './index.module.css';

export function Content({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={classes.content}>{children}</div>;
}
