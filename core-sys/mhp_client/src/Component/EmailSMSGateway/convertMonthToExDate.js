var today = new Date();

// Function to add months to a date
function addMonths(date, months) {
  var d = date.getDate();
  date.setMonth(date.getMonth() + months);
  if (date.getDate() != d) {
    date.setDate(0);
  }
  return date;
}

// Function to format the date as YYYY-MM-DD
function formatDate(date) {
  var month = String(date.getMonth() + 1).padStart(2, "0");
  var day = String(date.getDate()).padStart(2, "0");
  var year = date.getFullYear();
  return year + "-" + month + "-" + day;
}

// Function to generate the expiration date
export function convertMonthToDate(months) {
  var expirationDate = addMonths(today, months);
  return formatDate(expirationDate);
}
