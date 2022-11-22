import Report from "../../../components/Report";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import Link from "next/link";
import ClimbTitle from "../../../components/ClimbTitle";

const ALL_CLIMB_REPORTS = gql`
  query ALL_CLIMB_REPORTS($id: ID!) {
    Climb(where: { id: $id }) {
      id
      fa
      name
      reports {
        id
        image {
          image {
            publicUrlTransformed
          }
        }
        name
        # user {
        #   name
        # }
        email
        numReplaced
        typeOfBolts
        hooksInstalled
        volunteerHours
        workDate
        description
        createdAt
        reportedHardware
        typeOfReport
      }
      totalReports: _reportsMeta {
        count
      }
      unapprovedReports: _reportsMeta(where: { approved: false }) {
        count
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
  .needsReview,
  .needsReview a {
    background-color: red;
    color: #ffffff;
  }
  .sortButton {
    background-color: #bbbbbb;
    font-size: 1rem;
    font-weight: bold;
  }
`;

const ReportButtons = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-around;
  button {
    padding: 5px;
    font-size: 1rem;
    margin: 1rem;
  }
  button.hardware {
    background-color: orange;
  }
  button.rebolt {
    background-color: lightblue;
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
  .addReport {
    display: none;
  }
`;

const ReportStyle = styled.div`
  background-color: #ffffff;
  /* padding: 0 2rem; */
  border-radius: 5px;
  margin-bottom: 1rem;
`;

export default function AllReportsPage({ query }) {
  const id = query.id;

  const { loading, data, error } = useQuery(ALL_CLIMB_REPORTS, {
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
        <ReportButtons>
          <Link href={`../hardware-report/${data.Climb.id}`}>
            <button className="hardware">Add a hardware report</button>
          </Link>
          <Link href={`../work-report/${data.Climb.id}`}>
            <button className="rebolt">Add a work report</button>
          </Link>
        </ReportButtons>
        <ReportBar>
          <div>{data.Climb.totalReports.count} Reports Total</div>

          <div className="needsReview">
            <Link href={`../review-reports/${data.Climb.id}`}>
              <a>{data.Climb.unapprovedReports.count} Need Review</a>
            </Link>
          </div>

          <button className="sortButton">Sort</button>
        </ReportBar>
        <div>
          {data.Climb.reports?.length > 0 ? (
            data.Climb.reports.map((report) => (
              <>
                <table>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <ReportStyle>
                      <Report key={report.id} report={report} />
                      <div className="bottomBorder"></div>
                    </ReportStyle>
                  </td>
                </table>
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
