import formatMoney from "./formatMoney";
import calculatePizzaPrice from "./calculatePizzaPrice";
import { PizzaI, Order } from "../types/types";
export default function attachNamesAndPrices(order: Order[], pizzas: PizzaI[]) {
  return order.map((item) => {
    const pizza = pizzas.find((pizza) => pizza.id === item.id);
    return {
      ...item,
      name: pizza!.name,
      thumbnail: pizza!.image.asset.fluid.src,
      price: formatMoney(calculatePizzaPrice(pizza!.price, item.size)),
    };
  });
}
