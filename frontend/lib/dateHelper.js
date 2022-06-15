export default function dateHelper(timestamp = -2177452800) {
  const date = new Date(timestamp);
  return `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`;
}
