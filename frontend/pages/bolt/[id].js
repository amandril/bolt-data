import Bolt from "../../components/Bolt";

export default function SingleBoltPage({ query }) {
  return <Bolt id={query.id} />;
}
