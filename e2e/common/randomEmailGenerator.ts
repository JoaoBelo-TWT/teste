export function randomEmailGenerator() {
  const random = Math.floor(Math.random() * 1000000);
  return `bernardo+e2e-${random}@twistag.com`;
}
