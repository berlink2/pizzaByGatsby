const formatter = Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
});

export default function formatMoney(cents: number): string {
  return formatter.format(cents / 100);
}
