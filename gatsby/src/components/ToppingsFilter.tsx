import React, { useState, useEffect } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { PizzaI, Topping } from "../types/types";
import styled from "styled-components";

const ToppingStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    padding: 5px;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    text-decoration: none;
    background: var(--grey);
    border-radius: 5px;
    font-size: clamp(1.5rem, 1.4vw, 2.5rem);
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current="page"] {
      background: var(--yellow);
    }
  }
`;

interface StringArray {
  [topping: string]: number;
}
interface ToppingCount {
  count: number;
  topping: string;
}

function countPizzaForTopping(pizzaToppings: PizzaI[]) {
  const initial: StringArray = {};
  const counts = pizzaToppings
    .map((pizza) => {
      return pizza.toppings;
    })
    .flat()
    .reduce((acc, topping) => {
      const existing = acc[topping.name];
      if (existing) {
        acc[topping.name] += 1;
      } else {
        acc[topping.name] = 1;
      }
      return acc;
    }, initial);
  return Object.keys(counts).map((item) => ({
    topping: item,
    count: counts[item],
  }));
}

interface Props {
  activeTopping: string;
}

const ToppingsFilter: React.FC<Props> = ({ activeTopping }) => {
  const { pizzas } = useStaticQuery(graphql`
    query MyQuery {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);

  const toppingsWithCounts: ToppingCount[] = countPizzaForTopping(pizzas.nodes);

  return (
    <ToppingStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((item) => {
        return (
          <Link
            className={item.topping === activeTopping ? "active" : ""}
            to={`/topping/${item.topping}`}
            key={item.topping}
          >
            <span className="name">{item.topping}</span>
            <span className="count">{item.count}</span>
          </Link>
        );
      })}
    </ToppingStyles>
  );
};

export default ToppingsFilter;
