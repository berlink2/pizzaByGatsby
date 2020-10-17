import { graphql, Link, PageProps } from "gatsby";
import React from "react";
import { PersonI } from "../types/types";
import styled from "styled-components";
import Img from "gatsby-image";
import Pagination from "../components/Pagination";
import SEO from "../components/SEO";

const SlicemasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemasterStyles = styled.div`
  a {
    text-decoration: none;
  }

  .gatsby-image-wrapper {
    height: 400px;
  }

  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }

  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`;

interface QueryResult {
  slicemasters: { totalCount: number; nodes: PersonI[] };
}
type pageContext = { skip: number; currentPage: number; pageSize: number };

const SliceMastersPage: React.FC<PageProps<QueryResult, pageContext>> = ({
  data,
  pageContext,
}) => {
  const slicemasters = data.slicemasters.nodes;
  const { skip, currentPage, pageSize } = pageContext;

  return (
    <>
      <SEO title={`Slicemasters - Page ${currentPage || 1}`}></SEO>
      <Pagination
        skip={skip || 0}
        totalCount={data.slicemasters.totalCount}
        currentPage={currentPage || 1}
        pageSize={pageSize || 4}
        base={"/slicemasters"}
      />
      <SlicemasterGrid>
        {slicemasters.map((person) => {
          return (
            <SlicemasterStyles key={person.id}>
              <Link to={`/slicemasters/${person.slug.current}`}>
                <h2>
                  <span className="mark">{person.name}</span>
                </h2>
              </Link>
              <Img fluid={person.image.asset.fluid} />
              <p className="description">{person.description}</p>
            </SlicemasterStyles>
          );
        })}
      </SlicemasterGrid>
    </>
  );
};

export default SliceMastersPage;

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 2) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
