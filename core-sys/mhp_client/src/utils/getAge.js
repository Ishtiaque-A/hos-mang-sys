import moment from "moment";

// export const getAge = (birthDay) => {
//   const today = moment();
//   const birthDate = moment(birthDay);

//   if (isNaN(today.diff(birthDate, "years"))) {
//     return "N/A";
//   } else {
//     const years = today.diff(birthDate, "years");
//     const months = today.diff(birthDate, "months") % 12;
//     const days = today.diff(birthDate, "days") % 30; // Assuming an average month is 30 days

//     const ageString = [];

//     if (years > 0) {
//       ageString.push(`${years} Y`);
//     }

//     if (months > 0) {
//       ageString.push(`${months} M`);
//     }

//     if (days > 0) {
//       ageString.push(`${days}  D`);
//     }

//     return ageString.join(", ");
//   }
// };
export const getAge = (birthDay) => {
  const today = moment();
  const birthDate = moment(birthDay);

  if (!birthDate.isValid() || birthDate > today) {
    return "N/A";
  }

  const years = today.diff(birthDate, "years");
  birthDate.add(years, "years");

  const months = today.diff(birthDate, "months");
  birthDate.add(months, "months");

  const days = today.diff(birthDate, "days");

  const ageString = [];

  if (years > 0) {
    ageString.push(`${years} Y`);
  }

  if (months > 0) {
    ageString.push(`${months} M`);
  }

  if (days > 0) {
    ageString.push(`${days} D`);
  }

  return ageString.join(", ");
};
