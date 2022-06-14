import styled from "styled-components";

const ClimbTitleStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  h1.climbName {
    font-family: "Roboto Condensed";
    font-size: 2.5rem;
    margin: 0;
    line-height: 3rem;
  }
  .climbFa {
    font-size: 1rem;
    color: #cccccc;
  }
`;

export default function ClimbTitle({ climb }) {
  return (
    <ClimbTitleStyle>
      <h1 className="climbName">{climb.name}</h1>
      <span className="climbFa">FA: {climb.fa}</span>
    </ClimbTitleStyle>
  );
}
