const sizes: { [key: string]: number } = {
  S: 0.75,
  M: 1,
  L: 1.2,
};

export default function calculatePizzaPrice(
  cents: number,
  size: string
): number {
  return cents * sizes[size];
}
