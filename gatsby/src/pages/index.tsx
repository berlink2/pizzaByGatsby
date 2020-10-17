import React from "react";
import useLatestData from "../utils/useLatestData";
import { PizzaI, PersonI, SanityData } from "../types/types";
import { HomepageGrid } from "../styles/Grids";
import LoadingGrid from "../components/LoadingGrid";
import ItemGrid from "../components/ItemGrid";
interface CurrentlySlicingProps {
  slicemasters: SanityData[];
}

function CurrentlySlicing({ slicemasters }: CurrentlySlicingProps) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">SLicemasters On</span>
      </h2>
      <p>Ready to to serve!</p>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && (
        <p>No one is working right now!</p>
      )}
      {slicemasters?.length && <ItemGrid items={slicemasters} />}
    </div>
  );
}

interface HotSlicesProps {
  hotSlices: SanityData[];
}
function HotSlices({ hotSlices }: HotSlicesProps) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Hot Slices</span>
      </h2>
      <p>Come on by, buy the slice!</p>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && <p>No one is working right now!</p>}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
}

const Homepage: React.FC = () => {
  const { hotSlices, slicemasters } = useLatestData();

  return (
    <div className="center">
      <h1>The best pizza downtown!</h1>
      <p>Open 11am to 11pm</p>
      <HomepageGrid>
        <CurrentlySlicing slicemasters={slicemasters!} />
        <HotSlices hotSlices={hotSlices!} />
      </HomepageGrid>
    </div>
  );
};

export default Homepage;
