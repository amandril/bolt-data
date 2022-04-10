import styled from "styled-components";

const BoltStyle = styled.div`
  background-color: rgba(10, 10, 10, 0.1);
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export default function Bolt({ bolt }) {
  return (
    <BoltStyle>
      <div>Position: {bolt.position}</div>
      <div>Condition: {bolt.condition}</div>
    </BoltStyle>
  );
}
