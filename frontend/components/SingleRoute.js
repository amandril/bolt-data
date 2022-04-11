import { useQuery } from "@apollo/client";
import styled from "styled-components";
import gql from "graphql-tag";
import Bolt from "./Bolt";
import Link from "next/link";

const RouteStyle = styled.div`
  position: relative;
  max-width: 300px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  padding: 10px;
  border: 5px solid rgba(20, 20, 20, 0.3);
  h2 {
    background-color: peachpuff;
  }
`;

export const SINGLE_ROUTE_QUERY = gql`
  query SINGLE_ROUTE_QUERY($id: ID!) {
    Route(where: { id: $id }) {
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

export default function Route({ id }) {
  const { loading, data, error } = useQuery(SINGLE_ROUTE_QUERY, {
    variables: {
      id,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  const route = data.Route;
  return (
    <RouteStyle>
      <h2>{route.route_name}</h2>
      <span>{route.lnglat}</span>
      {route.bolts.length > 0 ? (
        route.bolts.map((bolt) => <Bolt key={bolt.id} bolt={bolt} />)
      ) : (
        <>
          <div>No hardware report</div>
        </>
      )}
      <div>
        <Link href={`./add-hardware/${id}`}>Add some</Link>
      </div>
    </RouteStyle>
  );
}
