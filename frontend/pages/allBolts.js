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
  grid-template-columns: 1fr 1fr;
  margin: 2rem;
  .reports {
    display: grid;
    gap: 30px;
    height: 10rem;
    grid-template-columns: repeat(2, minmax(0, 150px));
    > * {
      border: 1px solid red;
    }
  }
  h2,
  h3 {
    text-align: center;
  }
`;

const BoltNivoStyles = styled.div`
  position: relative;
  height: 400px;
  max-width: 600px;
  margin: 0 auto;
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
    _allReportsMeta {
      count
    }
    unapproved: _allReportsMeta(where: { approved_not: true }) {
      count
    }
    requiresWork: _allClimbsMeta(where: { status: "requiresWork" }) {
      count
    }
    needAssessment: _allClimbsMeta(where: { status: "assess" }) {
      count
    }
    inProgress: _allClimbsMeta(where: { status: "inProgress" }) {
      count
    }
  }
`;

export default function AllBoltsPage() {
  const { data, loading, error } = useQuery(ALL_BOLTS_COLORADO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const boltsArray = Object.entries(data)
    .slice(0, 5)
    .map(([key, value]) => {
      return {
        id: key,
        label: key,
        value: value.count,
        color: `${key == "poorBolts" ? "#ff0000" : "#223456"}`,
      };
    });

  return (
    <HomeStyles>
      {/* <div className="homeTop">
        <h1 className="pageHeader">
          <div>DataBolt is Bolts</div>
        </h1>
        <p>
          DataBolt makes it easy keep track of rebolting work and prioritize
          hardware for replacement.
        </p>
      </div> */}

      <div className="reports">
        <div>{data.unapproved.count} unapproved reports</div>
        <div>
          {data.requiresWork.count} climb
          {data.requiresWork.count > 1 ? "" : "s"} require
          {data.requiresWork.count > 1 ? "s" : ""} work
        </div>
        <div>{data.needAssessment.count} climbs need assessment</div>
        <div>{data.inProgress.count} climbs with work in progress</div>
      </div>

      <div>
        <h3>All Hardware Conditions</h3>
        <BoltNivoStyles>
          {/* <MyResponsivePie data={pieData} /> */}
          <MyResponsiveBar data={boltsArray} />
        </BoltNivoStyles>
      </div>
    </HomeStyles>
  );
}
