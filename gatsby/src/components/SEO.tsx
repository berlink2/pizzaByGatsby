import { graphql, useStaticQuery } from "gatsby";
import React, { ReactElement } from "react";
import { Helmet } from "react-helmet";

interface Props {
  children?: ReactElement;
  location?: string;
  description?: string;
  title?: string;
  image?: string;
}

const SEO: React.FC<Props> = ({
  children,
  location,
  description,
  title,
  image,
}) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitter
        }
      }
    }
  `);

  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{title}</title>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta name="description" content={site.siteMetadata.description} />
      {location && <meta property="og:url" content={location} />}
      <meta property="og:image" content={image || "/logo.svg"} />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta
        property="og:sitename"
        key="ogsitename"
        content={site.siteMetadata.title}
      />
      <meta property="og:description" content={site.siteMetadata.description} />
      {children}
    </Helmet>
  );
};

export default SEO;
