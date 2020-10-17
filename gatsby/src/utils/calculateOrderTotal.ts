import { PizzaI, Order } from "../types/types";
import calculatePizzaPrice from "./calculatePizzaPrice";
import formatMoney from "./formatMoney";

export default function calculateOrderTotal(
  order: Order[],
  pizzas: PizzaI[]
): string {
  const orderTotal = order.reduce((runningTotal, currOrder) => {
    const pizza = pizzas.find((pizza) => pizza.id === currOrder.id);
    runningTotal += calculatePizzaPrice(pizza!.price, currOrder.size);
    return runningTotal;
  }, 0);

  if (order.length > 0) {
    return formatMoney(orderTotal);
  } else {
    return "$0.00";
  }
}
