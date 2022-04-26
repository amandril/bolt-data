import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import testTest from "../components/BoltBar";

const MyResponsiveBar = dynamic(() => import("../components/BoltBar"), {
  ssr: false,
});

const HomeStyles = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 800px);
  justify-content: center;
  margin: 2rem 0;
  .homeTop {
    display: grid;
    justify-content: center;
    grid-template-columns: minmax(0, 480px);
    p {
      text-align: center;
    }
  }
  .graphPlusStats {
    display: grid;
    grid-template-columns: 1fr 5fr;
  }
`;

const BoltNivoStyles = styled.div`
  position: relative;
  height: 600px;
  max-width: 800px;
`;

// Query all the bolts in Colorado
const ALL_BOLTS_COLORADO = gql`
  query ALL_BOLTS_COLORADO {
    poorBolts: _allBoltsMeta(where: { condition: "poor" }) {
      count
    }
    averageBolts: _allBoltsMeta(where: { condition: "average" }) {
      count
    }
    goodBolts: _allBoltsMeta(where: { condition: "good" }) {
      count
    }
    bomberBolts: _allBoltsMeta(where: { condition: "bomber" }) {
      count
    }
    unknownBolts: _allBoltsMeta(where: { condition: "unknown" }) {
      count
    }
  }
`;

export default function AllBoltsPage() {
  const { data, loading, error } = useQuery(ALL_BOLTS_COLORADO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const boltsArray = Object.entries(data).map(([key, value]) => {
    return {
      id: key,
      label: key,
      value: value.count,
      color: `${key == "poorBolts" ? "#ff0000" : "#223456"}`,
    };
  });

  return (
    <HomeStyles>
      <div className="homeTop">
        <h1 className="pageHeader">
          <div>DataBolt is Bolts</div>
        </h1>
        <p>
          DataBolt makes it easy to keep track of climbing stewardship work, get
          accurate field reports, and make data meaningful.
        </p>
      </div>

      <BoltNivoStyles>
        {/* <MyResponsivePie data={pieData} /> */}
        <MyResponsiveBar data={boltsArray} />
      </BoltNivoStyles>
      {/* <div className="graphPlusStats">
        <div>Total Climbs: </div>
        <div>Climbs with hardware reports</div>
      </div> */}
    </HomeStyles>
  );
}
