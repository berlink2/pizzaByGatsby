import { graphql, PageProps } from "gatsby";
import React from "react";
import { PizzaI } from "../types/types";
import Img from "gatsby-image";
import styled from "styled-components";
import SEO from "../components/SEO";
interface QueryResult {
  pizza: PizzaI;
  location: any;
}

const PizzaGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

const SinglePizzaPage: React.FC<PageProps<QueryResult>> = ({
  data: { pizza },
  location,
}) => {
  return (
    <>
      <SEO
        image={pizza.image?.asset?.fluid?.src}
        title={pizza.name}
        location={location.href}
      ></SEO>
      <PizzaGrid>
        <Img fluid={pizza.image.asset.fluid} />
        <div>
          <h2 className="mark">{pizza.name}</h2>
          <ul>
            {pizza.toppings.map((topping) => (
              <li key={topping.id}>{topping.name}</li>
            ))}
          </ul>
        </div>
      </PizzaGrid>
    </>
  );
};

export default SinglePizzaPage;

export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      id
      name
      toppings {
        name
        id
        vegetarian
      }
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
