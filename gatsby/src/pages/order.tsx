import { graphql, PageProps } from "gatsby";
import React from "react";
import SEO from "../components/SEO";
import { PizzaI } from "../types/types";
import useForm from "../utils/useForm";
import Img from "gatsby-image";
import calculatePizzaPrice from "../utils/calculatePizzaPrice";
import formatMoney from "../utils/formatMoney";
import OrderStyles from "../styles/OrderStyles";
import MenuItemStyles from "../styles/MenuItemStyles";
import usePizza from "../utils/usePizza";
import PizzaOrder from "../components/PizzaOrder";
import calculateOrderTotal from "../utils/calculateOrderTotal";

interface QueryResult {
  pizzas: { nodes: PizzaI[] };
}

const OrdersPage: React.FC<PageProps<QueryResult>> = ({ data }) => {
  const { values, updateValue } = useForm({
    name: "",
    email: "",
  });
  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = usePizza({
    pizzas: data.pizzas.nodes,
    inputs: values,
  });

  if (message) {
    return <p>{message}</p>;
  }
  return (
    <>
      <SEO></SEO>
      <OrderStyles>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={values?.name}
            id="name"
            onChange={updateValue}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={values?.email}
            id="email"
            name="email"
            onChange={updateValue}
          />
          <label id="mapleSyrup" htmlFor="mapleSyrup"></label>
          <input
            type="mapleSyrup"
            value={values?.mapleSyrup}
            id="mapleSyrup"
            name="mapleSyrup"
            onChange={updateValue}
          />
        </fieldset>
        <fieldset className="menu">
          <legend>Menu</legend>
          {data.pizzas.nodes.map((pizza) => {
            return (
              <MenuItemStyles key={pizza.id}>
                <Img
                  className="pizza-image"
                  fluid={pizza.image.asset.fluid}
                  alt={pizza.name}
                />
                <div>
                  <h2>{pizza.name}</h2>
                </div>
                <div>
                  {["S", "M", "L"].map((size) => {
                    return (
                      <button
                        key={size}
                        onClick={() =>
                          addToOrder({
                            id: pizza.id,
                            size,
                          })
                        }
                        type="button"
                      >
                        {size}{" "}
                        {formatMoney(calculatePizzaPrice(pizza.price, size))}
                      </button>
                    );
                  })}
                </div>
              </MenuItemStyles>
            );
          })}
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            pizzas={data.pizzas.nodes}
            removeFromOrder={removeFromOrder}
          />
        </fieldset>
        <fieldset>
          <h3>Your total is {calculateOrderTotal(order, data.pizzas.nodes)}</h3>
          {error && <div>Error: {error.message}</div>}
          <button
            disabled={loading}
            onClick={(e) => submitOrder(e)}
            type="submit"
          >
            {loading ? "Placing Order" : "Order Ahead"}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
};

export default OrdersPage;

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
