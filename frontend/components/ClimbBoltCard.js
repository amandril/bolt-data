import Link from "next/link";
import styled from "styled-components";

const ClimbBoltCardStyle = styled.div`
  background-color: #ffffff;
  display: grid;
  grid-template-columns: 1fr 180px 1fr 1fr;
  grid-gap: 0.5rem;
  justify-content: space-around;
  border-radius: 5px;
  height: 5rem;
  .boltStat {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    line-height: initial;
    /* border: 2px solid red; */
    grid-gap: 7px;
    .boltStatName {
      font-size: 0.8rem;
      color: #cdcdcd;
      align-self: end;
      /* line-height: 0.5rem; */
    }
    .boltStatValue {
      font-size: 1rem;
      color: #222222;
      font-weight: bold;
      align-self: start;
    }
  }
`;

const BoltConditionStyle = styled.div`
  font-weight: bold;
  display: grid;
  align-items: center;
  font-size: 0.8rem;
  background-color: lightgray;
  color: rgba(0, 0, 0, 0.5);
  margin: 1.2rem;
  text-align: center;
  border-radius: 10px;
`;

export default function ClimbBoltCard({ bolt }) {
  return (
    <ClimbBoltCardStyle>
      <div className="boltStat">
        <span className="boltStatName">position</span>
        <span className="boltStatValue">{bolt.position}</span>
      </div>
      <BoltConditionStyle className={bolt.condition}>
        {bolt.condition}
      </BoltConditionStyle>
      <div className="boltStat">
        <span className="boltStatName">use</span>
        <span className="boltStatValue">{bolt.use}</span>
      </div>
      <div className="boltStat">
        <span className="boltStatName">type</span>
        <span className="boltStatValue">{bolt.type}</span>
      </div>
    </ClimbBoltCardStyle>
  );
}
