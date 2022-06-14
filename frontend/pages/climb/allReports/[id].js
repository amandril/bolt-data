import Report from "../../../components/Report";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import AddReport from "../../../components/AddReport";
import Link from "next/link";
import AddReportToggle from "../../../components/AddReportToggle";

const ALL_CLIMB_REPORTS = gql`
  query ALL_CLIMB_REPORTS($id: ID!) {
    Climb(where: { id: $id }) {
      id
      name
      reports {
        image {
          image {
            publicUrlTransformed
          }
        }
        user {
          name
        }
        description
        createdAt
      }
      _reportsMeta {
        count
      }
    }
  }
`;

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

export default function AllReportsPage({ query }) {
  const id = query.id;

  const { loading, data, error } = useQuery(ALL_CLIMB_REPORTS, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <BoltCardStyle>
      <AddReportToggle />
      <div className="addReport">
        <AddReport climb={data.Climb} />
      </div>
      <p>
        These are the reports for{" "}
        <Link href={`../${id}`}>{data.Climb.name}</Link>:{" "}
        <strong>{data.Climb._reportsMeta.count} reports</strong>.
      </p>
      <div>
        {data.Climb.reports?.length > 0 ? (
          data.Climb.reports.map((report) => (
            <Report key={report.id} report={report} />
          ))
        ) : (
          <div>None</div>
        )}
      </div>
    </BoltCardStyle>
  );
}
