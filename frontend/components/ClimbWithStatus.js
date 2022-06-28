import Link from "next/link";
import styled from "styled-components";
import HardwareBarBolts from "./HardwareBarBolts";

const ClimbStatusStyle = styled.div`
  padding: 20px;
  background-color: #eeeeee;
  border-radius: 10px;
  margin: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  > * {
    /* border: 1px solid red; */
    /* min-width: 10rem; */
  }
  .stats {
    /* display: inline-block; */
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default function ClimbWithStatus({ climb }) {
  return (
    <Link href={`./climb/${climb.id}`}>
      <a>
        <ClimbStatusStyle>
          <div className="stats">
            <span>
              <strong>{climb.name}</strong>
            </span>
            <span>{climb._reportsMeta.count} reports</span>
            <span>{climb._boltsMeta.count} bolts</span>
          </div>
          <HardwareBarBolts climb={climb} />
        </ClimbStatusStyle>
      </a>
    </Link>
  );
}
