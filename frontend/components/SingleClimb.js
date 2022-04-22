import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import styled from "styled-components";
import gql from "graphql-tag";
import Bolt from "./Bolt";
import Link from "next/link";
import dynamic from "next/dynamic";
import BoltCard from "./BoltCard";

const MyResponsiveBar = dynamic(() => import("./BoltBar"), {
  ssr: false,
});

const ClimbMain = styled.div`
  position: relative;
  margin: 0 3rem;
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  padding: 10px;
  h2 {
    background-color: peachpuff;
  }
`;

const ClimbName = styled.h1`
  font-family: "Roboto Condensed";
  font-size: 2.5rem;
`;

const BoltSection = styled.div`
  margin: 0;
  background-color: #eeeeee;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  .boltCards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 350px));
    grid-gap: 10px;
    margin: 2rem auto;
  }
`;

const BoltGraphStyles = styled.div`
  position: relative;
  height: 300px;
  width: 100%;
`;

export const SINGLE_CLIMB_QUERY = gql`
  query SINGLE_CLIMB_QUERY($id: ID!) {
    Climb(where: { id: $id }) {
      id
      name
      fa
      bolts(orderBy: "position") {
        id
        position
        condition
        pitch
        use
        type
      }
    }
    climbBolts: Climb(where: { id: $id }) {
      poorBolts: _boltsMeta(where: { condition: "poor" }) {
        count
      }
      averageBolts: _boltsMeta(where: { condition: "average" }) {
        count
      }
      goodBolts: _boltsMeta(where: { condition: "good" }) {
        count
      }
      bomberBolts: _boltsMeta(where: { condition: "bomber" }) {
        count
      }
      unknownBolts: _boltsMeta(where: { condition: "unknown" }) {
        count
      }
    }
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
  const bolts = data.climbBolts; // Aliased bolts for use in the nuvi graph

  // console.log(climb.bolts); // returns all the bolts, no aliases

  const boltsArray = Object.entries(bolts)
    .slice(0, 5)
    .map(([key, value]) => {
      return {
        id: key,
        label: key,
        value: value.count,
        color: `${key == "poorBolts" ? "#ff0000" : "#223456"}`,
      };
    });

  // console.log(boltsArray);

  return (
    <div>
      <ClimbMain>
        <div>
          <ClimbName>{climb.name}</ClimbName>
          <p>{climb.fa}</p>
        </div>
        <BoltGraphStyles>
          <MyResponsiveBar data={boltsArray} key={boltsArray.id} />
        </BoltGraphStyles>
      </ClimbMain>
      <div>
        <Link href={{ pathname: `./add-hardware/${id}`, query: climb }}>
          Add Fixed Hardware
        </Link>
      </div>
      <BoltSection>
        <div className="boltCards">
          {climb.bolts.length > 0 ? (
            climb.bolts.map((bolt) => <BoltCard key={bolt.id} bolt={bolt} />)
          ) : (
            <div>No hardware report</div>
          )}
        </div>
      </BoltSection>
    </div>
  );
}
