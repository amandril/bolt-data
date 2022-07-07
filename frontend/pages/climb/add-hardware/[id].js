import AddHardwareToClimb from "../../../components/AddHardwareToClimb";
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
  font-family: "Roboto Condensed";
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
  /* margin-bottom: 10rem; */
`;

const AddMultipleButton = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 300px);
  justify-content: center;
  margin-bottom: 50px;
  button {
    color: rgba(0, 0, 0, 0.5);
    background-color: #ffa133;
    padding: 1rem 2rem;
    margin: 1rem 0;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 5px;
    border: 0;
  }
`;

export default function addHardwarePage({ query }) {
  return (
    <div>
      <AddToStyle>
        <div className="above">Add hardware to</div>
        <Link href={`../${query.id}`}>
          <a>
            <ClimbName>{query.name}</ClimbName>
          </a>
        </Link>
      </AddToStyle>
      <FormSectionStyle>
        {/* <AddMultipleButton>
          <Link
            href={{ pathname: `../add-multiple/${query.id}`, query: query }}
          >
            <button>Add Multiple?</button>
          </Link>
        </AddMultipleButton> */}
        <AddHardwareToClimb id={query.id} />
      </FormSectionStyle>
    </div>
  );
}
