import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";

const BoltStyle = styled.div`
  background-color: rgba(10, 10, 10, 0.1);
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const SINGLE_BOLT_QUERY = gql`
  query SINGLE_BOLT_QUERY($id: ID!) {
    Bolt(where: { id: $id }) {
      id
      pitch
      position
      type
      use
      condition
      description
      installDate
    }
  }
`;

export default function Bolt({ id }) {
  const { loading, data, error } = useQuery(SINGLE_BOLT_QUERY, {
    variables: {
      id,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const bolt = data.Bolt;

  return (
    <BoltStyle>
      <div>Position: {bolt.position}</div>
      <div>Condition: {bolt.condition}</div>
    </BoltStyle>
  );
}
