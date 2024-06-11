export default function FormatRupiah(number) {
  // Ensure number is a valid number
  if (isNaN(number)) {
    return "Invalid number";
  }

  // Handle negative numbers (optional)
  const isNegative = number < 0;
  number = Math.abs(number);

  // Round to two decimal places (optional)
  number = Math.round(number * 100) / 100; // Multiply by 100 for two decimals, then divide by 100

  // Add comma separators for thousands
  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine the parts with a decimal point
  const formattedNumber = parts.join(".");

  // Add 'Rp' prefix and handle negative sign (optional)
  return (isNegative ? "-Rp" : "Rp") + formattedNumber;
}
