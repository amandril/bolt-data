import { useQuery } from "@apollo/client";
import styled from "styled-components";
import gql from "graphql-tag";
import Link from "next/link";
import dynamic from "next/dynamic";
import ClimbBoltCard from "./ClimbBoltCard";
import HardwareBarBolts from "./HardwareBarBolts";
import ClimbTitle from "./ClimbTitle";

const MyResponsiveBar = dynamic(() => import("./BoltBar"), {
  ssr: false,
});

const ClimbMain = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr;
  gap: 50px;
  padding: 100px;
`;

const PitchStyle = styled.h2`
  color: #626262;
  font-weight: normal;
  font-size: 1.5rem;
  font-family: "Roboto Condensed";
  .pitchNum {
    font-weight: bold;
  }
  justify-self: start;
  /* grid-column: 1 / span 3; */
`;

const BoltGraphStyles = styled.div`
  position: relative;
  height: 200px;
  width: 100%;
`;

const AddBoltStyle = styled.div`
  background-color: #ffffff;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  padding: 1rem;
  border-radius: 5px;
  font-size: 1.3rem;
  color: #dfdfdf;
  font-weight: bold;
  height: 200px;
  width: 100%;
  margin-top: 20px;
  align-items: center;
  :hover {
    .addBoltPlus {
      background-color: #d3d3d3;
    }
    color: #d3d3d3;
  }
  .addBoltPlus {
    background-color: #dfdfdf;
    height: 40px;
    width: 40px;
    border-radius: 100%;
    position: relative;
    ::before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      width: 60%;
      margin-left: -30%;
      margin-top: -3px;
      border-top: #ffffff 6px solid;
    }
    ::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      height: 60%;
      margin-left: -3px;
      margin-top: -30%;
      border-left: #ffffff 6px solid;
    }
  }
`;
const BoltFooterStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
`;

export const SINGLE_CLIMB_QUERY = gql`
  query SINGLE_CLIMB_QUERY($id: ID!) {
    Climb(where: { id: $id }) {
      id
      name
      fa
      bolts(orderBy: "position") {
        id
        pitch
        position
        type
        use
        condition
        # description
        installDate
        _reportsMeta {
          count
        }
      }
      _reportsMeta {
        count
      }
    }
    # climbBolts: Climb(where: { id: $id }) {
    #   poorBolts: _boltsMeta(where: { condition: "poor" }) {
    #     count
    #   }
    #   averageBolts: _boltsMeta(where: { condition: "average" }) {
    #     count
    #   }
    #   goodBolts: _boltsMeta(where: { condition: "good" }) {
    #     count
    #   }
    #   bomberBolts: _boltsMeta(where: { condition: "bomber" }) {
    #     count
    #   }
    #   unknownBolts: _boltsMeta(where: { condition: "unknown" }) {
    #     count
    #   }
    # }
  }
`;

export default function SingleClimb({ id }) {
  const { loading, data, error } = useQuery(SINGLE_CLIMB_QUERY, {
    variables: {
      id,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  const climb = data.Climb;
  // const bolts = data.climbBolts; // Aliased bolts for use in the nuvi graph

  // console.log(climb.bolts); // returns all the bolts, no aliases

  // const boltsArray = Object.entries(bolts)
  //   .slice(0, 5)
  //   .map(([key, value]) => {
  //     return {
  //       id: key,
  //       value: value.count,
  //     };
  //   });

  // console.log(boltsArray);

  // console.log(data);

  return (
    <div>
      <ClimbMain>
        <ClimbTitle climb={climb} />
        {/* <BoltGraphStyles>
          <MyResponsiveBar data={boltsArray} />
        </BoltGraphStyles> */}
        <div>
          <HardwareBarBolts climb={climb} />
        </div>
      </ClimbMain>

      <div className="boltSection">
        <div className="boltCards">
          {/* <PitchStyle>
            <span>Pitch</span> <span className="pitchNum">1</span>
          </PitchStyle> */}
          {climb.bolts.length > 0 ? (
            climb.bolts.map((bolt) => (
              <Link key={bolt.id} href={`/bolt/${bolt.id}`}>
                <a>
                  <ClimbBoltCard key={bolt.id} bolt={bolt} />
                </a>
              </Link>
            ))
          ) : (
            <div>No hardware yet</div>
          )}
        </div>
      </div>
      <BoltFooterStyle>
        <Link href={{ pathname: `./add-hardware/${id}`, query: climb }}>
          <AddBoltStyle>
            Add Hardware
            <div className="addBoltPlus"></div>
          </AddBoltStyle>
        </Link>
        <Link href={{ pathname: `./add-hardware/${id}`, query: climb }}>
          <AddBoltStyle>Edit Climb</AddBoltStyle>
        </Link>
        <Link href={{ pathname: `./allReports/${id}` }}>
          <AddBoltStyle>
            Total reports: {climb._reportsMeta.count}
            <br />
            View all reports
          </AddBoltStyle>
        </Link>
      </BoltFooterStyle>
      <div>{}</div>
    </div>
  );
}
