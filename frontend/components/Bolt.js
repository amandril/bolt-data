import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import BoltCard from "./BoltCard.js";

const ClimbName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  padding: 1rem;
`;

export const SINGLE_BOLT_QUERY = gql`
  query SINGLE_BOLT_QUERY($id: ID!) {
    Bolt(where: { id: $id }) {
      id
      climb {
        name
      }
      pitch
      position
      type
      use
      condition
      description
      installDate
      reports {
        user {
          name
        }
        timestamp
        description
        image {
          image {
            publicUrlTransformed
          }
        }
      }
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
  // console.log(bolt);

  return (
    <div className="boltSection">
      <ClimbName>{bolt.climb.name}</ClimbName>
      <BoltCard bolt={bolt} />
    </div>
  );
}
