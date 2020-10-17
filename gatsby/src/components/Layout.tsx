import React, { ReactElement, ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import styled from "styled-components";
import "normalize.css";
import GlobalStyles from "../styles/GlobalStyles";
import Typography from "../styles/Typography";
import Stripes from "../assets/images/stripes.svg";
import SEO from "./SEO";
const ContentStyles = styled.div`
  background: white;
  padding: 2rem;
`;

const SiteBorderStyles = styled.div`
  max-width: 1000px;
  margin: 12rem auto 4rem auto;
  margin-top: clamp(2rem, 10vw, 12rem);
  background: white url(${Stripes});
  background-size: 1500px;
  padding: 5px;
  padding: clamp(5px, 1vw, 25px);
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.044);
  border: 5px solid white;
  @media (max-width: 1100px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;

interface Props {
  children: ReactElement;
}

const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <>
      <SEO title={"The Best Pizza in Canada!"}></SEO>
      <GlobalStyles />
      <Typography />
      <SiteBorderStyles>
        <ContentStyles>
          <Nav />
          {children}
          <Footer />
        </ContentStyles>
      </SiteBorderStyles>
    </>
  );
};

export default Layout;
