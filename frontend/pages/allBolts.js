import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";

const MyResponsiveBar = dynamic(() => import("../components/BoltBar"), {
  ssr: false,
});

const DisplayClimbsStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

  // console.log(boltsArray);

  return (
    <>
      <div>All current fixed hardware</div>

      <br />
      <br />
      <BoltNivoStyles>
        {/* <MyResponsivePie data={pieData} /> */}
        <MyResponsiveBar data={boltsArray} key={boltsArray.id} />
      </BoltNivoStyles>
    </>
  );
}
