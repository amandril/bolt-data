import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";

import gql from "graphql-tag";

const BOULDER_CANYON_CLIMBS_QUERY = gql`
  query BOULDER_CANYON_CLIMBS_QUERY {
    area(id: "62605ac6e17bf9c4dd8ba872") {
      areaName
      children {
        areaName
        climbs {
          id
          name
          fa
          metadata {
            lng
            lat
          }
        }
      }
    }
  }
`;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000",
});

export default function openBetaTest() {
  const { loading, data, error } = useQuery(BOULDER_CANYON_CLIMBS_QUERY, {
    client,
    fetchPolicy: "no-cache",
  });

  console.log(loading, data, error);

  //   const DATA_BOLT_BOCAN_MUTATION = gql`
  //       mutation DATA_BOLT_BOCAN_MUTATION($id: ID!, $name: String!, $fa: String!, $lat: Number!, $lng: Number!) {

  //       }
  //     `;

  return (
    <div>
      <div>
        <strong>{data?.area.areaName}</strong>
      </div>
      {data?.area.children.map((child) =>
        child.climbs.map((climb) => <div key={climb.id}>{climb.name}</div>)
      )}
    </div>
  );
}
