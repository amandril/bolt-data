import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import ApproveReport from "../components/ApproveReport";
import DeleteReport from "../components/DeleteReport";
import Report from "../components/Report";

const UnapprovedStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem;
`;

const ReportsStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background-color: #ffffff;
  padding: 2rem;
  margin: 1rem;
  border-radius: 10px;
  .approveButtons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
`;

const GET_UNAPPROVED_REPORTS_QUERY = gql`
  query GET_UNAPPROVED_REPORTS_QUERY {
    allUnapproved: allReports(where: { approved_not: true }) {
      id
      user {
        name
      }
      createdAt
      climb {
        openbetaClimbId
        name
      }
      description
      image {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function unapprovedReports() {
  const { data, error, loading } = useQuery(GET_UNAPPROVED_REPORTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const reports = data.allUnapproved;

  return (
    <div className="boltSection">
      <UnapprovedStyle>
        <div>These are the unapproved reports</div>
        {reports?.length > 0 ? (
          reports.map((report) => (
            <ReportsStyle>
              <Report report={report} />
              <div className="approveButtons">
                {/* Modal for selecting climb condition */}
                <ApproveReport className="approveButton" id={report.id} />
                {/* Modal for are you sure */}
                <DeleteReport className="deleteButton" id={report.id} />
              </div>
            </ReportsStyle>
          ))
        ) : (
          <div>No unapproved reports to show</div>
        )}
      </UnapprovedStyle>
    </div>
  );
}
