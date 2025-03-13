export function isValidDate(dateString) {
  const parsedDate = new Date(dateString);
  return !isNaN(parsedDate.getTime());
}
