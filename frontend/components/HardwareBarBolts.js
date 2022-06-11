import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import HardwareBar from "./HardwareBar";

const CLIMB_BOLTS_QUERY = gql`
  query CLIMB_BOLTS_QUERY($id: ID!) {
    climbBolts: Climb(where: { id: $id }) {
      poorBolts: _boltsMeta(where: { condition: "poor" }) {
        count
      }
      averageBolts: _boltsMeta(where: { condition: "average" }) {
        count
      }
      goodBolts: _boltsMeta(where: { condition: "good" }) {
        count
      }
      bomberBolts: _boltsMeta(where: { condition: "bomber" }) {
        count
      }
      unknownBolts: _boltsMeta(where: { condition: "unknown" }) {
        count
      }
      _boltsMeta {
        count
      }
    }
  }
`;

export default function HardwareBarBolts({ climb }) {
  const { loading, data, error } = useQuery(CLIMB_BOLTS_QUERY, {
    variables: {
      id: climb.id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const {
    poorBolts,
    averageBolts,
    goodBolts,
    bomberBolts,
    unknownBolts,
    _boltsMeta,
  } = data.climbBolts;

  return <HardwareBar {...data.climbBolts} />;
}
