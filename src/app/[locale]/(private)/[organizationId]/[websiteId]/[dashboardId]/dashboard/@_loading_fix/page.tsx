/**
 * The first parallel route at the top of the directory is not properly rendering it's loading
 * component. In dev mode it works as expected but in production it loads the top level loading.
 * So we need this file at the top of the directory to fix the issue.
 */
export default function Page() {
  // eslint-disable-next-line i18next/no-literal-string
  return <>Page</>;
}
