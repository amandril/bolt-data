import Report from "../../../components/Report";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import Link from "next/link";
import ClimbTitle from "../../../components/ClimbTitle";
import { ReportButton } from "../../../components/styles/Button";

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
        user {
          name
        }
        email
        numReplaced
        typeOfBolts
        hooksInstalled
        volunteerHours
        workDate
        where
        problem
        description
        createdAt
        reportedHardware
        typeOfReport
        otherVolunteers
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

const ReportButtonSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 3rem 0;
`;

const ReportBar = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 1.5rem 0;
  margin-bottom: 2rem;

  > * {
    padding: 0 1rem;
    margin: 0 1rem;
    border-radius: 5px;
  }
  .needsReview,
  .needsReview a {
    color: ${(props) => props.color};
  }
  .needsReview .reviewNum {
    background-color: red;
    color: #ffffff;
    padding: 3px 5px;
    border-radius: 5px;
    font-weight: bold;
  }
  .sortButton {
    background-color: #f4f5f7;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    color: #999999;
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

export default function AllReportsPage({ query }) {
  const id = query.id;

  const { loading, data, error } = useQuery(ALL_CLIMB_REPORTS, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  console.log(data);

  const unapproved = data.Climb.unapprovedReports.count > 0;

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
        {/* New report buttons */}
        <ReportButtonSection>
          <Link href={`../hardware-report/${data.Climb.id}`}>
            <ReportButton hardware>New Hardware Report</ReportButton>
          </Link>
          <Link href={`../rebolt-report/${data.Climb.id}`}>
            <ReportButton work>New Rebolt Report</ReportButton>
          </Link>
        </ReportButtonSection>
        <ReportBar color={unapproved ? "red" : "green"}>
          <div>
            <strong>{data.Climb.totalReports.count}</strong> total reports
          </div>

          <div className="needsReview">
            {unapproved ? (
              <Link href={`../review-reports/${data.Climb.id}`}>
                <a>
                  <span className="reviewNum">
                    {data.Climb.unapprovedReports.count}
                  </span>{" "}
                  not reviewed
                </a>
              </Link>
            ) : (
              <span>All reports reviewed</span>
            )}
          </div>

          <button className="sortButton">Sort</button>
        </ReportBar>
        <div>
          {data.Climb.reports?.length > 0 ? (
            data.Climb.reports.map((report) => (
              <Report key={report.id} report={report} />
            ))
          ) : (
            <div>No reports</div>
          )}
        </div>
      </BoltCardStyle>
    </>
  );
}
