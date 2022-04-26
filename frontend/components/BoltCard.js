import Link from "next/link";
import styled from "styled-components";

const BoltCardStyle = styled.div`
  background-color: #ffffff;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.5rem;
  justify-items: center;
  padding: 1rem;
  border-radius: 5px;
  height: 200px;
  .boltStats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1.5rem;
    .boltStat {
      display: grid;
      grid-template-columns: 1fr;
      justify-items: center;
      .boltStatName {
        font-size: 0.8rem;
        color: #acacac;
        line-height: 0.5rem;
      }
      .boltStatValue {
        font-size: 1rem;
        color: #222222;
        font-weight: bold;
      }
    }
  }
`;

const BoltConditionStyle = styled.div`
  font-weight: bold;
  display: grid;
  align-items: center;
  font-size: 1rem;
  background-color: lightgray;
  color: rgba(0, 0, 0, 0.5);
  height: 3rem;
  width: 80%;
  margin: 1rem;
  text-align: center;
  border-radius: 10px;
`;

export default function BoltCard({ bolt }) {
  return (
    <BoltCardStyle>
      <BoltConditionStyle className={bolt.condition}>
        {bolt.condition}
      </BoltConditionStyle>
      <div className="boltStats">
        <div className="boltStat">
          <span className="boltStatName">position</span>
          <span className="boltStatValue">{bolt.position}</span>
        </div>
        <div className="boltStat">
          <span className="boltStatName">use</span>
          <span className="boltStatValue">{bolt.use}</span>
        </div>
        <div className="boltStat">
          <span className="boltStatName">type</span>
          <span className="boltStatValue">{bolt.type}</span>
        </div>
      </div>
    </BoltCardStyle>
  );
}
