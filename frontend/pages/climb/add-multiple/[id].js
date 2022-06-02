import AddMultipleToClimb from "../../../components/AddMultipleToClimb";
import styled from "styled-components";
import Link from "next/link";

const AddToStyle = styled.div`
  position: relative;
  margin: 0 auto;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr;
  padding: 100px;
  .above {
    font-size: 1.5rem;
  }
`;

const ClimbName = styled.h1`
  font-family: "Roboto Condensed";
  font-size: 2.5rem;
  margin: 0;
  line-height: 3rem;
`;

const FormSectionStyle = styled.div`
  margin: 0;
  padding: 3rem 0 10rem;
  background-color: #eeeeee;
`;

export default function addHardwarePage({ query }) {
  return (
    <div>
      <AddToStyle>
        <div className="above">Add hardware to</div>
        <ClimbName>{query.name}</ClimbName>
      </AddToStyle>
      <FormSectionStyle>
        <AddMultipleToClimb id={query.id} />
      </FormSectionStyle>
    </div>
  );
}
