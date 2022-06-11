import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import ClimbWithStatus from "../components/ClimbWithStatus";

const REQUIRES_WORK_QUERY = gql`
  query REQUIRES_WORK_QUERY {
    requiresWork: allClimbs(where: { status: "requiresWork" }) {
      id
      name
      _reportsMeta {
        count
      }
      _boltsMeta {
        count
      }
    }
  }
`;

export default function requiresWork() {
  const { loading, data, error } = useQuery(REQUIRES_WORK_QUERY);

  if (loading) return <div>Loading...</div>;

  console.log(data);

  return (
    <div>
      <div>These routes require work</div>

      {data.requiresWork.map((climb) => (
        <ClimbWithStatus climb={climb} />
      ))}
    </div>
  );
}
