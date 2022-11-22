import Report from "../../../components/Report";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import Link from "next/link";
import ClimbTitle from "../../../components/ClimbTitle";
import ApproveReport from "../../../components/ApproveReport";
import DeleteReport from "../../../components/DeleteReport";

const ALL_UNAPPROVED_REPORTS = gql`
  query ALL_UNAPPROVED_REPORTS($id: ID!) {
    Climb(where: { id: $id }) {
      id
      fa
      name
      reports(where: { approved: false }) {
        id
        image {
          image {
            publicUrlTransformed
          }
        }
        user {
          name
        }
        email
        description
        createdAt
        reportedHardware
        typeOfReport
      }
    }
  }
`;

const PageTitle = styled.div`
  padding: 5rem 0;
  display: grid;
  justify-content: center;
  .pageTitleType {
    font-family: "roboto condensed";
    font-size: 1.5rem;
  }
`;

const ReportBar = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 1rem 0;
  font-weight: bold;

  > * {
    padding: 0 1rem;
    margin: 0 1rem;
    border-radius: 5px;
  }
  .needsReview {
    background-color: red;
    color: #ffffff;
  }
  .sortButton {
    background-color: #bbbbbb;
  }
`;

const BoltCardStyle = styled.div`
  background-color: #eeeeee;
  display: grid;
  grid-template-columns: 650px;
  justify-content: center;
  padding: 1rem;
  margin: 0 auto;
  border-radius: 5px;
  /* width: 650px; */
  .addReport {
    display: none;
  }
`;

export default function ReviewReportsPage({ query }) {
  const id = query.id;

  const { loading, data, error } = useQuery(ALL_UNAPPROVED_REPORTS, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  console.log(data);

  return (
    <>
      <PageTitle>
        <div className="pageTitleType">Reports for</div>
        <Link href={`../${data.Climb.id}`}>
          <a>
            <ClimbTitle climb={data.Climb} />
          </a>
        </Link>
      </PageTitle>

      <BoltCardStyle>
        <h3>These are all the unreviewed reports</h3>
        <div>
          {data.Climb.reports?.length > 0 ? (
            data.Climb.reports.map((report) => (
              <>
                {report.bolt ? (
                  <span>
                    Bolt: Pitch {report.bolt.pitch}, Position{" "}
                    {report.bolt.position}
                  </span>
                ) : (
                  ""
                )}
                <Report key={report.id} report={report} />
                <div className="approveButtons">
                  {/* Modal for selecting climb condition */}
                  <ApproveReport className="approveButton" id={report.id} />
                  {/* Modal for are you sure */}
                  <DeleteReport className="deleteButton" id={report.id} />
                </div>
              </>
            ))
          ) : (
            <div>No reports</div>
          )}
        </div>
      </BoltCardStyle>
    </>
  );
}
