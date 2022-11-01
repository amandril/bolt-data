import Report from "../../../components/Report";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import Link from "next/link";
import ClimbTitle from "../../../components/ClimbTitle";
import HardwareReport from "../../../components/HardwareReport";

const BoltCardStyle = styled.div`
  background-color: #ffffff;
  display: grid;
  grid-template-columns: 1fr;
  padding: 1rem;
  margin: 0 auto;
  border-radius: 5px;
  width: 650px;
  .addReport {
    display: none;
  }
`;

const GET_CLIMB = gql`
  query GET_CLIMB($id: ID!) {
    Climb(where: { id: $id }) {
      id
      name
      fa
    }
  }
`;

export default function hardwareReportPage({ query }) {
  const { loading, data, error } = useQuery(GET_CLIMB, {
    variables: { id: query.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  console.log(data);

  return (
    <BoltCardStyle>
      <div>
        <Link href={`../${query.id}`}>
          <a>
            <ClimbTitle climb={data.Climb} />
          </a>
        </Link>
        <HardwareReport climb={data.Climb} />
      </div>
    </BoltCardStyle>
  );
}
