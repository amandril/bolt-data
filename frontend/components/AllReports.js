import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";

export const ALL_CLIMB_REPORTS = gql`
  query ALL_CLIMB_REPORTS($id: ID!) {
    Climb(where: { id: $id }) {
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

const Report = styled.div`
  font-size: 0.8rem;
  padding: 1rem 2rem;
  border-left: 1px solid #222222;
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  .reportThumbs {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
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
`;

export default function AllReports({ id }) {
  const { loading, data, error } = useQuery(ALL_CLIMB_REPORTS, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // console.log(data);
  return (
    <BoltCardStyle>
      <p>
        These are the reports for {data.Climb.name}:{" "}
        <strong>{data.Climb._reportsMeta.count} reports</strong>.
      </p>
      <div>
        {data.Climb.reports?.length > 0 ? (
          data.Climb.reports.map((report) => (
            <Report>
              <div>
                <span>
                  <strong>
                    {report.createdAt} by {report.user.name}
                  </strong>
                </span>
              </div>
              <div>{report.description}</div>
              <div className="reportThumbs">
                <img
                  width="100%"
                  src={report.image?.image.publicUrlTransformed}
                />
              </div>
            </Report>
            // <div>
            //   <div>
            //     {report.createdAt ? report.createdAt : "No Date"} by{" "}
            //     {report.user.name}
            //   </div>
            //   <div></div>
            // </div>
          ))
        ) : (
          <div>None</div>
        )}
      </div>
    </BoltCardStyle>
  );
}
