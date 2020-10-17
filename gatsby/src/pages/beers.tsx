import { graphql, PageProps } from "gatsby";
import React from "react";
import styled from "styled-components";
import { BeerI } from "../types/types";
import SEO from "../components/SEO";

const BeerGridStyles = styled.div`
  margin-top: 5rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 10px;
    color: black;
  }
`;

interface QueryResult {
  beers: { nodes: BeerI[] };
}

const BeersPage: React.FC<PageProps<QueryResult>> = ({ data }) => {
  const beers = data.beers.nodes;

  return (
    <>
      <SEO title={`Beers! We have ${beers.length} beers in stock`}></SEO>
      <h2 className="center">
        We have ${beers.length} Beers available. Dine in only!
      </h2>
      <BeerGridStyles>
        {beers.map((beer) => {
          const rating = Math.round(beer.rating.average);
          return (
            <SingleBeerStyles key={beer.id}>
              <img src={beer.image} alt={beer.name} />
              <h3>{beer.name}</h3>
              <h2 title={`${rating} out of 5 stars`}>{`*`.repeat(rating)}</h2>
              <span>{`${beer.rating.reviews} Reviews`}</span>
              <p>{beer.price}</p>
            </SingleBeerStyles>
          );
        })}
      </BeerGridStyles>
    </>
  );
};

export default BeersPage;

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;
