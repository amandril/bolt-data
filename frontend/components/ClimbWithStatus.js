import Link from "next/link";
import styled from "styled-components";
import HardwareBar from "./HardwareBar";
import HardwareBarBolts from "./HardwareBarBolts";

const ClimbStatusStyle = styled.div`
  padding: 20px;
  background-color: #eeeeee;
  border-radius: 10px;
  margin: 1rem;
  > * {
    display: inline-block;
    min-width: 10rem;
  }
`;

export default function ClimbWithStatus({ climb }) {
  return (
    <Link href={`./climb/${climb.id}`}>
      <a>
        <ClimbStatusStyle>
          <span>{climb.name}</span>
          <span>Reports: {climb._reportsMeta.count}</span>
          <span>Bolts: {climb._boltsMeta.count}</span>
          <HardwareBarBolts climb={climb} />
        </ClimbStatusStyle>
      </a>
    </Link>
  );
}
