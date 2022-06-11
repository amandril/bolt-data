import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import ApproveReport from "../components/ApproveReport";
import DeleteReport from "../components/DeleteReport";
import Report from "../components/Report";

const ReportStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background-color: #dedede;
  padding: 1rem;
  margin: 1rem;
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
    <div>
      <div>These are the unapproved reports</div>
      {reports?.length > 0 ? (
        reports.map((report) => (
          <>
            <Report report={report} />
            <div>
              {/* Modal for selecting climb condition */}
              <ApproveReport id={report.id} />
              {/* Modal for are you sure */}
              <DeleteReport id={report.id} />
            </div>
          </>
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
    </div>
  );
}
