import styled from "styled-components";
import UpdateHardwareForClimb from "../../../components/UpdateHardwareForClimb";

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
  /* margin-bottom: 10rem; */
`;

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

export default function editBolt({ query }) {
  return (
    <div>
      <AddToStyle>
        <div className="above">Update hardware for</div>
        <ClimbName>{query.name}</ClimbName>
      </AddToStyle>
      <FormSectionStyle>
        <UpdateHardwareForClimb id={query.id} />
      </FormSectionStyle>
    </div>
  );
}
