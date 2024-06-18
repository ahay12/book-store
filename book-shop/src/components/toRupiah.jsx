export default function FormatRupiah(number) {
  if (isNaN(number)) {
    return "Invalid number";
  }

  const isNegative = number < 0
  number = Math.abs(number)

  number = Math.round(number * 100) / 100

  const parts = number.toString().split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  const formattedNumber = parts.join(".")

  return (isNegative ? "-Rp" : "Rp") + formattedNumber
}
