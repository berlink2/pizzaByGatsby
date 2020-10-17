import React from "react";
import { graphql, PageProps } from "gatsby";
import ToppingsFilter from "../components/ToppingsFilter";
import PizzaList from "../components/PizzaList";
import { PizzaI } from "../types/types";
import SEO from "../components/SEO";
export const query = graphql`
  query PizzaQuery($toppingRegex: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
    ) {
      nodes {
        name
        id
        price
        slug {
          current
        }
        toppings {
          name
          id
          vegetarian
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
          }
        }
      }
    }
  }
`;

interface QueryResult {
  pizzas: { nodes: PizzaI[] };
  pageContext: { topping: string };
}
type pageContext = { topping: string; toppingRegex: string };

const PizzaPage: React.FC<PageProps<QueryResult>> = ({ data, pageContext }) => {
  const pizzas = data.pizzas.nodes;
  const { topping } = pageContext as pageContext;
  return (
    <>
      <SEO title={topping ? `Pizzas with ${topping}` : "All Pizzas"}></SEO>
      <ToppingsFilter activeTopping={topping} />
      <PizzaList pizzas={pizzas} />
    </>
  );
};

export default PizzaPage;
