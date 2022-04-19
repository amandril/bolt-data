import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Route from "../components/Route";
import styled from "styled-components";

const DisplayRoutesStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const BoltGraphStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  div {
    padding: 5px;
    text-align: center;
  }
`;

const PoorBoltsStyle = styled.div`
  background-color: red;
`;
const AverageBoltsStyle = styled.div`
  background-color: yellow;
`;
const GoodBoltsStyle = styled.div`
  background-color: green;
`;
const BomberBoltsStyle = styled.div`
  background-color: blue;
`;
const UnknownBoltsStyle = styled.div`
  background-color: gray;
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

const ALL_ROUTES_QUERY = gql`
  query ALL_ROUTES_QUERY {
    allRoutes(where: { route_name_contains_i: "wrinkle" }) {
      id
      route_name
      lnglat
      bolts {
        id
        position
        condition
      }
    }
  }
`;

export default function RoutesPage() {
  const { data, loading, error } = useQuery(ALL_BOLTS_COLORADO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // console.log(data, loading, error);

  return (
    // <DisplayRoutesStyle>
    //   {data?.allRoutes.map((route) => {
    //     return <Route key={route.id} route={route} />;
    //   })}
    // </DisplayRoutesStyle>
    <>
      <div>Bolts and their conditions</div>
      <BoltGraphStyles>
        <PoorBoltsStyle>Poor: {data?.poorBolts.count}</PoorBoltsStyle>
        <AverageBoltsStyle>
          Average: {data?.averageBolts.count}
        </AverageBoltsStyle>
        <GoodBoltsStyle>Good: {data?.goodBolts.count}</GoodBoltsStyle>
        <BomberBoltsStyle>Bomber: {data?.bomberBolts.count}</BomberBoltsStyle>
        <UnknownBoltsStyle>
          Unknown: {data?.unknownBolts.count}
        </UnknownBoltsStyle>
      </BoltGraphStyles>
    </>
  );
}
