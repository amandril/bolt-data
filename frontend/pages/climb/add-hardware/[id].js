import AddHardwareToClimb from "../../../components/AddHardwareToClimb";

export default function addHardwarePage({ query }) {
  console.log(query);
  return (
    <div>
      This is the page where you will add hardware for the {query.name} route.
      <AddHardwareToClimb id={query.id} />
    </div>
  );
}
