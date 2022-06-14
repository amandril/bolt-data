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
  background-color: #eeeeee;
  padding: 1rem;
  margin: 1rem;
  .approveButtons {
    display: grid;
    /* grid-template-columns: 1fr 1fr; */
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
          // <ReportStyle>
          //   <div>
          //     {report.climb ? `Report for ${report.climb.name}` : "No climb"}
          //   </div>
          //   <div>
          //     {report.user ? `Submitted by ${report.user.name}` : "No user"}
          //   </div>
          //   <div>ID: {report.id}</div>
          //   <div>Created at {report.createdAt || "[no date]"}</div>
          //   <div>Description: {report.description || "[no description]"}</div>
          //   <div>
          //     Photos:{" "}
          //     {report.image ? (
          //       <img
          //         width="100"
          //         src={report.image?.image.publicUrlTransformed}
          //       />
          //     ) : (
          //       "No photos"
          //     )}
          //   </div>
          // </ReportStyle>
        ))
      ) : (
        <div>No unapproved reports to show</div>
      )}
    </UnapprovedStyle>
  );
}
