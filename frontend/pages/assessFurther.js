import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Link from "next/link";
import styled from "styled-components";

const ASSESS_FURTHER_QUERY = gql`
  query ASSESS_FURTHER_QUERY {
    requiresWork: allClimbs(where: { status: "assess" }) {
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

const AssessFurtherStyle = styled.div`
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
  const { loading, data, error } = useQuery(ASSESS_FURTHER_QUERY);

  if (loading) return <div>Loading...</div>;

  console.log(data);

  return (
    <div>
      <div>These routes need further assessment</div>

      {data.requiresWork.map((climb) => (
        <Link href={`./climb/${climb.id}`}>
          <a>
            <AssessFurtherStyle>
              <span>{climb.name}</span>
              <span>{climb._reportsMeta.count} reports</span>
              <span>{climb._boltsMeta.count} bolts</span>
            </AssessFurtherStyle>
          </a>
        </Link>
      ))}
    </div>
  );
}
