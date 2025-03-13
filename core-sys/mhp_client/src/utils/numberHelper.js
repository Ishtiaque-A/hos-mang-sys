import { parsePhoneNumberFromString } from "libphonenumber-js";
/**
 * @param {string} hn
 * @param {number} step
 * @returns {string}
 * @example formateHN("HN-123456") => "HN-123 456"
 * @description This function is used to format HN to have space between every 4 digits
 */

export function formateHN(hn, step = 4) {
  if (hn) {
    const [firstPart, secondPart] = hn.split("-"); // split HN to 2 parts
    if (secondPart.length > 0) {
      const numOfArray = [];
      const secondPartLength = secondPart.length;
      for (let i = 0; i < secondPartLength; i += step) {
        numOfArray.push(secondPart.slice(i, i + step));
      }
      return `${firstPart}-${numOfArray.join(" ")}`;
    }
    return hn;
  }
}
// Define the type of the parameters
formateHN.Params = {
  hn: "string",
  step: "number",
};

/**
 * @param {string | number} num
 * @param {number} step
 * @returns {string}
 * @example numHelper("123456") => "123 456"
 * @description This function is used to format number to have space between every 3 digits
 */
export function numHelper(num, step = 3) {
  if (!isNaN(+num)) {
    let removeNonDigit = num.replace(/\D/g, ""); // remove all non-digit characters

    if (removeNonDigit.length > 0) {
      const numOfArray = [];
      const removeNonDigitLength = removeNonDigit.length;
      for (let i = 0; i < removeNonDigitLength; i += step) {
        numOfArray.push(removeNonDigit.slice(i, i + step));
      }
      return numOfArray.join(" ");
    }
  } else {
    return num;
  }
}

// Define the type of the parameters
numHelper.Params = {
  num: "string | number",
  step: "number",
};

/**
 * @param {string} num
 * @returns {string}
 * @example formatPhoneNumber("1234567890") => "123-456-7890" || formatPhoneNumber("+8801734567890") => "+880-173-456-7890"
 * @description This function is used to format phone number to have "-" between every 3 digits
 */

export function formatPhoneNumber(num) {
  if (num) {
    const phoneNumber = parsePhoneNumberFromString(num);
    if (phoneNumber) {
      return phoneNumber.formatInternational();
    } else {
      return num;
    }
  }

  return "";
}
