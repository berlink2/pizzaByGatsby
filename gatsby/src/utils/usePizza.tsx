import { useState } from "react";
import { PizzaI, Order } from "../types/types";
import { useOrder } from "../Context/OrderContext";
import formatMoney from "./formatMoney";
import attachNamesAndPrices from "./attachNamesAndPrices";
import calculatePizzaPrice from "./calculatePizzaPrice";
import { Props as FormProps } from "./useForm";

interface Props {
  pizzas: PizzaI[];
  inputs: FormProps;
}

interface Return {
  order: Order[];
  addToOrder: (orderedPizza: Order) => void;
  removeFromOrder: (index: number) => void;
  loading: boolean;
  message: string;
  error: any;
  submitOrder: (e: React.SyntheticEvent) => void;
}

const usePizza = ({ pizzas, inputs }: Props): Return => {
  //const [order, setOrder] = useState<Order[]>([]);
  const { order, setOrder } = useOrder();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function addToOrder(orderedPizza: Order): void {
    setOrder([...order, orderedPizza]);
  }

  function removeFromOrder(index: number): void {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  }

  const orderTotal = order.reduce((runningTotal, currOrder) => {
    const pizza = pizzas.find((pizza) => pizza.id === currOrder.id);
    runningTotal += calculatePizzaPrice(pizza!.price, currOrder.size);
    return runningTotal;
  }, 0);

  async function submitOrder(e: React.SyntheticEvent) {
    e.preventDefault();

    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(orderTotal),
      name: inputs.name,
      email: inputs.email,
      mapleSyrup: inputs.mapleSyrup,
    };
    setLoading(true);
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await res.text());
    if (res.status > 400 && res.status < 600) {
      setLoading(false);
      setError(text.message);
    } else {
      setLoading(false);
      setMessage("Your pizza will be here waiting for you!!!");
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
};

export default usePizza;
