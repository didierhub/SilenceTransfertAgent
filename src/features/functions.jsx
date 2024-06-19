export const calculateFeesAndTotal = (amount) => {
  let fees = 0;

  if (amount >= 0.01 && amount <= 25) {
    fees = 5.99;
  } else if (amount >= 26 && amount <= 50) {
    fees = 7.99;
  } else if (amount >= 51 && amount <= 75) {
    fees = 9.99;
  } else if (amount >= 76 && amount <= 100) {
    fees = 11.99;
  } else if (amount >= 101 && amount <= 200) {
    fees = 15.99;
  } else if (amount >= 201 && amount <= 300) {
    fees = 19.99;
  } else if (amount >= 301 && amount <= 400) {
    fees = 23.99;
  } else if (amount >= 401 && amount <= 500) {
    fees = 27.99;
  } else if (amount >= 501 && amount <= 600) {
    fees = 32.99;
  } else if (amount >= 601 && amount <= 700) {
    fees = 36.99;
  } else if (amount >= 701 && amount <= 800) {
    fees = 41.99;
  } else if (amount >= 801 && amount <= 900) {
    fees = 46.99;
  } else if (amount >= 901 && amount <= 1000) {
    fees = 51.99;
  } else if (amount >= 1001 && amount <= 1200) {
    fees = amount * 0.055; // 5.50%
  } else if (amount >= 1201 && amount <= 1400) {
    fees = amount * 0.056; // 5.60%
  } else if (amount >= 1401 && amount <= 1600) {
    fees = amount * 0.057; // 5.70%
  } else if (amount >= 1601 && amount <= 1800) {
    fees = amount * 0.058; // 5.80%
  } else if (amount >= 1801 && amount <= 2000) {
    fees = amount * 0.059; // 5.90%
  } else if (amount >= 2001 && amount <= 4000) {
    fees = amount * 0.06; // 6.00%
  } else if (amount >= 4001 && amount <= 6000) {
    fees = amount * 0.062; // 6.20%
  } else if (amount >= 6001 && amount <= 10000) {
    fees = amount * 0.0625; // 6.25%
  } else if (amount >= 10001) {
    fees = amount * 0.065; // 6.50%
  }

  const totalAmount = amount + fees;
  return { fees, totalAmount };
};
