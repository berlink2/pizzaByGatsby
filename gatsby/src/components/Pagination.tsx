import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

const PaginationStyles = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 5px;
  & > * {
    padding: 1rem;
    text-align: center;
    flex: 1;
    border-right: 1px solid var(--grey);
    text-decoration: none;
    &[aria-current],
    &.current {
      color: var(--red);
    }
    &.disabled {
      pointer-events: none;
      color: var(--grey);
    }
  }
`;

interface Props {
  skip: number;
  currentPage: number;
  pageSize: number;
  totalCount: number;
  base: string;
}

const Pagination: React.FC<Props> = ({
  pageSize,
  totalCount,
  currentPage,
  skip,
  base,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <PaginationStyles>
      {
        <Link
          className={currentPage === 1 ? "disabled" : ""}
          to={`${base}/${prevPage}`}
        >
          &#8592; Previous Page
        </Link>
      }
      {Array.from({ length: totalPages }).map((_, i) => {
        return (
          <Link
            className={currentPage === 1 && i === 0 ? "current" : ""}
            key={`${base}/${i + 1}`}
            to={`${base}/${i > 0 ? i + 1 : ""}`}
          >
            {i + 1}
          </Link>
        );
      })}
      {
        <Link
          className={currentPage === totalPages ? "disabled" : ""}
          to={`${base}/${nextPage}`}
        >
          {" "}
          Next Page &#8594;
        </Link>
      }
    </PaginationStyles>
  );
};

export default Pagination;
