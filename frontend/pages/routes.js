import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Route from "../components/Route";
import styled from "styled-components";

const DisplayRoutesStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
  const { data, loading, error } = useQuery(ALL_ROUTES_QUERY, {
    // variables: {
    // }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // console.log(data, loading, error);

  return (
    <DisplayRoutesStyle>
      {data?.allRoutes.map((route) => {
        return <Route key={route.id} route={route} />;
      })}
    </DisplayRoutesStyle>
  );
}
