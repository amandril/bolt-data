import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Link from "next/link";
import styled from "styled-components";

export const IN_PROGRESS_QUERY = gql`
  query ASSESS_FURTHER_QUERY {
    requiresWork: allClimbs(where: { status: "inProgress" }) {
      id
      name
      _reportsMeta {
        count
      }
      _boltsMeta {
        count
      }
    }
  }
`;

const InProgressStyle = styled.div`
  padding: 20px;
  background-color: #eeeeee;
  border-radius: 10px;
  margin: 1rem;
  span {
    display: inline-block;
    min-width: 10rem;
  }
`;

export default function requiresWork() {
  const { loading, data, error } = useQuery(IN_PROGRESS_QUERY);

  if (loading) return <div>Loading...</div>;

  console.log(data);

  return (
    <div>
      <h1 className="pageHeader">These routes are currently being worked on</h1>

      {data.requiresWork.map((climb) => (
        <Link href={`./climb/${climb.id}`}>
          <a>
            <InProgressStyle>
              <span>{climb.name}</span>
              <span>{climb._reportsMeta.count} reports</span>
              <span>{climb._boltsMeta.count} total bolts</span>
            </InProgressStyle>
          </a>
        </Link>
      ))}
    </div>
  );
}
