import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Link from "next/link";
import styled from "styled-components";
import BoltCard from "./BoltCard.js";
import ClimbTitle from "./ClimbTitle.js";

const ClimbName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  padding: 1rem;
`;

export const SINGLE_BOLT_QUERY = gql`
  query SINGLE_BOLT_QUERY($id: ID!) {
    Bolt(where: { id: $id }) {
      id
      climb {
        id
        name
        fa
      }
      pitch
      position
      type
      use
      condition
      # description
      installDate
      reports(sortBy: createdAt_DESC) {
        id
        user {
          name
        }
        createdAt
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
      <Link href={`/climb/${bolt.climb.id}`}>
        <a>
          <ClimbTitle climb={bolt.climb} />
        </a>
      </Link>
      <BoltCard bolt={bolt} />
    </div>
  );
}
