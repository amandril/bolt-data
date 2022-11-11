import Report from "../../../components/Report";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import AddReport from "../../../components/AddReport";
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
        user {
          name
        }
        bolt {
          pitch
          position
        }
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

const ReportStyle = styled.div`
  background-color: #cdcdcd;
  padding: 0 2rem;
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
    <BoltCardStyle>
      <div>
        <Link href={`../${data.Climb.id}`}>
          <a>
            <ClimbTitle climb={data.Climb} />
          </a>
        </Link>
      </div>
      <AddReport climb={data.Climb} toggle={true} />
      <div>
        <div className="cardLabel">Reports</div>
        {data.Climb.reports?.length > 0 ? (
          data.Climb.reports.map((report) => (
            <ReportStyle>
              {report.bolt ? (
                <span>
                  Bolt: Pitch {report.bolt.pitch}, Position{" "}
                  {report.bolt.position}
                </span>
              ) : (
                ""
              )}
              <Report key={report.id} report={report} />
              <div className="bottomBorder"></div>
            </ReportStyle>
          ))
        ) : (
          <div>No reports</div>
        )}
      </div>
    </BoltCardStyle>
  );
}
