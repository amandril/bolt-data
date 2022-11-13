export default function dateHelper(timestamp = -2177452800) {
  const date = new Date(timestamp);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}
