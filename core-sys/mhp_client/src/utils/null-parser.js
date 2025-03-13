export const nullParser = (data) => {
  if (
    data == null ||
    data === "null" ||
    data === "NULL" ||
    data === "undefined" ||
    data === undefined ||
    data === ""
  ) {
    return false;
  } else {
    return data;
  }
};
