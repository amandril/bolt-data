import UpdateStatusForClimb from "../../../components/UpdateStatusForClimb";

export default function editBoltPage({ query }) {
  return <UpdateStatusForClimb climb={query} climbId={query.id} />;
}
