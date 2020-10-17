import React, { ReactElement } from "react";
import MenuItemStyles from "../styles/MenuItemStyles";
import { Order, PizzaI } from "../types/types";
import Img from "gatsby-image";
import calculatePizzaPrice from "../utils/calculatePizzaPrice";
import formatMoney from "../utils/formatMoney";

interface Props {
  order: Order[];
  pizzas: PizzaI[];
  removeFromOrder: (index: number) => void;
}

const PizzaOrder = ({
  order,
  pizzas,
  removeFromOrder,
}: Props): ReactElement => {
  return (
    <>
      {order.map((singleOrder, i) => {
        const pizza = pizzas.find((pizza) => pizza.id === singleOrder.id);
        return (
          <MenuItemStyles key={singleOrder.id + i}>
            <Img fluid={pizza!.image?.asset?.fluid} />
            <h2>
              {pizza?.name} {singleOrder.size}
            </h2>
            <p>
              {formatMoney(calculatePizzaPrice(pizza!.price, singleOrder.size))}
              <button
                className="remove"
                type="button"
                onClick={() => removeFromOrder(i)}
                title={`Remove ${singleOrder.size} ${pizza?.name} from Order`}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
};

export default PizzaOrder;
