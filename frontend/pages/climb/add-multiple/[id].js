import AddMultipleToClimb from "../../../components/AddMultipleToClimb";
import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";

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
`;

const BoltQuantityFormStyle = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 10px;
`;

export default function addHardwarePage({ query }) {
  const [boltQ, setBoltQ] = useState(null),
    [boltSubmit, setBoltSubmit] = useState(null);

  const handleNum = (e) => {
    setBoltQ(e.target.value);
  };

  const setBoltQuantity = (e) => {
    e.preventDefault();
    setBoltSubmit(true);
  };

  return (
    <div>
      <AddToStyle>
        <div className="above">Add hardware to</div>
        <ClimbName>{query.name}</ClimbName>
      </AddToStyle>
      <FormSectionStyle>
        {!boltSubmit ? (
          <BoltQuantityFormStyle>
            <span>How many bolts would you like to add?</span>
            <input type="number" name="boltQuantity" onChange={handleNum} />
            <button type="submit" onClick={setBoltQuantity}>
              Submit
            </button>
          </BoltQuantityFormStyle>
        ) : (
          <AddMultipleToClimb id={query.id} quantity={boltQ} />
        )}
      </FormSectionStyle>
    </div>
  );
}
