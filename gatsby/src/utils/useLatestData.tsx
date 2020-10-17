import { useEffect, useState } from "react";
import { PizzaI, PersonI, SanityData } from "../types/types";
const gql = String.raw;
const deets = `
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`;
const GRAPHQL_ENDPOINT = process.env.GATSBY_GRAPHQL_ENDPOINT;
const query = gql`
  query {
    StoreSettings(id: "downtown") {
      name
      slicemaster {
        ${deets}
      }
      hotSlices {
        ${deets}
      }
    }
  }
`;

const useLatestData = () => {
  const [hotSlices, setHotSlices] = useState<SanityData[]>();
  const [slicemasters, setSlicemasters] = useState<SanityData[]>();

  useEffect(function () {
    fetch(GRAPHQL_ENDPOINT as RequestInfo, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        setHotSlices(data.data.StoreSettings.hotSlices);
        setSlicemasters(data.data.StoreSettings.slicemaster);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return { hotSlices, slicemasters };
};

export default useLatestData;
