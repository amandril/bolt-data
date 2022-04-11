import AddHardwareToRoute from "../../../components/AddHardwareToRoute";

export default function addHardwarePage({ query }) {
  return (
    <div>
      This is the page where you will add hardware for the {query.id} route.
      <AddHardwareToRoute id={query.id} />
    </div>
  );
}
