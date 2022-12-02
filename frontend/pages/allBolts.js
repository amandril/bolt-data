import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Link from "next/link";
import HardwareBar from "../components/HardwareBar";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

const MapContainerStyle = styled.div`
  height: 600px;
  width: 600px;
`;

const HomeStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1000px;
  margin: 2rem auto;
  justify-items: center;
  .statGrid {
    display: grid;
    gap: 30px;
    margin: 50px;
    height: 10rem;

    grid-template-columns: repeat(4, minmax(0, 2000px));
    .stat {
      /* border: 1px solid red; */
      background-color: #eeeeee;
      border-radius: 10px;
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.5rem;
      padding: 40px;
      height: 100%;
      text-align: center;
      line-height: 1.5rem;
      .num {
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
      }
    }
  }
  h2,
  h3 {
    text-align: center;
  }
`;

// const BoltNivoStyles = styled.div`
//   position: relative;
//   height: 400px;
//   max-width: 600px;
//   margin: 0 auto;
// `;

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
    _allBoltsMeta {
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
    <>
      <HomeStyles>
        {/* <HardwareBar
        poorBolts={data.poorBolts}
        averageBolts={data.averageBolts}
        goodBolts={data.goodBolts}
        bomberBolts={data.bomberBolts}
        unknownBolts={data.unknownBolts}
        _boltsMeta={data._allBoltsMeta}
      /> */}
        <div className="statGrid">
          <Link href="./unapprovedReports">
            <a>
              <div className="stat">
                <span className="num">{data.unapproved.count}</span>
                <span>unapproved reports</span>
              </div>
            </a>
          </Link>
          <Link href="./requiresWork">
            <a>
              <div className="stat">
                <span className="num">{data.requiresWork.count}</span>
                <span>
                  climb
                  {data.requiresWork.count < 1 ? "" : "s"} require
                  {data.requiresWork.count < 1 ? "s" : ""} work
                </span>
              </div>
            </a>
          </Link>
          <Link href="./assessFurther">
            <a>
              <div className="stat">
                <span className="num">{data.needAssessment.count}</span>
                <span>climbs need assessment</span>
              </div>
            </a>
          </Link>
          <Link href="./inProgress">
            <a>
              <div className="stat">
                <span className="num">{data.inProgress.count}</span>
                <span>climbs in progress</span>
              </div>
            </a>
          </Link>
        </div>

        {/* <div>
        <h3>All Hardware Conditions</h3>
        <BoltNivoStyles>
          <MyResponsiveBar data={boltsArray} />
        </BoltNivoStyles>
      </div> */}
      </HomeStyles>
      <MapContainerStyle>
        <Map />
      </MapContainerStyle>
    </>
  );
}
