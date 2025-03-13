export function numberToWordsTaka(num) {
  const belowTwenty = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const thousands = ["", "Thousand", "Lakh", "Crore"];

  if (num === 0 || isNaN(num) || num < 0) return "Zero Taka";

  let word = "";

  function helper(n) {
    if (n === 0) return "";
    else if (n < 20) return belowTwenty[n] + " ";
    else if (n < 100) return tens[Math.floor(n / 10)] + " " + helper(n % 10);
    else
      return belowTwenty[Math.floor(n / 100)] + " Hundred " + helper(n % 100);
  }

  // Split into Taka and Paisa parts
  const [taka, paisa] = num.toFixed(2).split("."); // Ensure two decimal places

  let i = 0;
  let takaNum = parseInt(taka);
  while (takaNum > 0) {
    if (takaNum % 1000 !== 0) {
      word = helper(takaNum % 1000) + thousands[i] + " " + word;
    }
    takaNum = Math.floor(takaNum / 1000);
    i++;
  }

  word = word.trim() + " Taka";

  // Process Paisa
  const paisaNum = parseInt(paisa);
  if (paisaNum > 0) {
    word += " and " + helper(paisaNum).trim() + " Paisa";
  }

  return word;
}
