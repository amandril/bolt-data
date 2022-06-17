import { useEffect } from "react";
import styled from "styled-components";
import { handleChange } from "../lib/useForm";

const AddMultipleFormStyling = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  .formHead,
  fieldset {
    display: grid;
    grid-template-columns: repeat(5, 100px) 175px;
    border: 0;
    justify-content: center;
    grid-gap: 20px;
    input,
    textarea,
    select {
      display: block;
      padding: 1rem 1rem;
      /* margin: 1rem; */
      border-radius: 5px;
      font-size: 1rem;
      border: 2px solid #dddddd;
    }
    .addBoltButton {
      padding: 15px;
      border: none;
      background-color: #d8d8d8;
      border-radius: 5px;
      font-size: 1rem;
      font-weight: bold;
      color: #666666;
      justify-self: end;
    }
    .addBoltButton:hover {
      opacity: 0.8;
    }
  }
  .addHardwareButton {
    padding: 15px;
    border: none;
    background-color: lightgreen;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    color: #666666;
    justify-self: center;
  }
  .addHardwareButton:hover {
    opacity: 0.8;
  }
`;

const fieldSet = () => `<fieldset>
<input
  type="number"
  id="pitch"
  name="pitch"
  onChange={handleChange}
/>
<input
  // required
  type="number"
  id="position"
  name=""
  onChange={handleChange}
/>
<select type="select" id="use" name="use" defaultValue="select" onChange={handleChange}>
<option value="select" disabled hidden>
              Select
            </option>
  <option value="lead">Lead</option>
  <option value="anchor">Anchor</option>
  <option value="belay">Belay</option>
</select>
<select type="select" id="type" name="type" defaultValue="select" onChange={handleChange}>
<option value="select" disabled hidden>
              Select
            </option>
  <option value="bolt">Bolt</option>
  <option value="pin">Pin</option>
  <option value="webbing">Webbing</option>
  <option value="other">Other</option>
</select>
<select
  type="select"
  id="condition"
  name="condition"
  defaultValue="select"
  onChange={handleChange}
>
<option value="select" disabled hidden>
              Select
            </option>
  <option value="bomber">Bomber</option>
  <option value="good">Good</option>
  <option value="average">Average</option>
  <option value="poor">Poor</option>
  <option value="unknown">Unknown</option>
</select>
<input
  // required
  type="text"
  id="description"
  name="description"
  onChange={handleChange}
/>
</fieldset>`;

const addFields = (e) => {
  // let newfield = { pitch: "", position: "" };
  // setInputs([...inputs, newfield]);
  e.preventDefault();
  console.log("adding fields");
  document.querySelector(".multiFields").innerHTML += fieldSet();
};

export default function AddMultipleToClimb({ id }) {
  useEffect(() => {
    document.querySelector(".multiFields").innerHTML += fieldSet();
    document.querySelector(".multiFields").innerHTML += fieldSet();
    document.querySelector(".multiFields").innerHTML += fieldSet();
    document.querySelector(".multiFields").innerHTML += fieldSet();
    document.querySelector(".multiFields").innerHTML += fieldSet();
  });

  return (
    <AddMultipleFormStyling>
      <div className="duplicateFieldset"></div>
      <div className="formHead">
        <span>Pitch</span>
        <span>Position</span>
        <span>Use</span>
        <span>Type</span>
        <span>Condition</span>
        <span>Description</span>
      </div>
      <div className="multiFields">
        {/* <fieldset>
          <input
            // required
            type="number"
            id="pitch"
            name="pitch"
            onChange={handleChange}
          />
          <input
            // required
            type="number"
            id="position"
            name=""
            onChange={handleChange}
          />
          <select
            type="select"
            id="use"
            name="use"
            defaultValue="select"
            onChange={handleChange}
          >
            <option value="select" disabled hidden>
              Select
            </option>
            <option value="lead">Lead</option>
            <option value="anchor">Anchor</option>
            <option value="belay">Belay</option>
          </select>
          <select
            type="select"
            id="type"
            name="type"
            defaultValue="select"
            onChange={handleChange}
          >
            <option value="select" disabled hidden>
              Select
            </option>
            <option value="bolt">Bolt</option>
            <option value="pin">Pin</option>
            <option value="webbing">Webbing</option>
            <option value="other">Other</option>
          </select>
          <select
            type="select"
            id="condition"
            name="condition"
            defaultValue="select"
            onChange={handleChange}
          >
            <option value="select" disabled hidden>
              Select
            </option>
            <option value="bomber">Bomber</option>
            <option value="good">Good</option>
            <option value="average">Average</option>
            <option value="poor">Poor</option>
            <option value="unknown">Unknown</option>
          </select>
          <input
            // required
            type="text"
            id="description"
            name="description"
            onChange={handleChange}
          />
        </fieldset> */}
      </div>
      <fieldset>
        <button
          className="addBoltButton"
          onClick={addFields}
          onLoad={addFields}
        >
          + Bolt
        </button>
      </fieldset>
      <button className="addHardwareButton" type="submit">
        + Add Hardware
      </button>
    </AddMultipleFormStyling>
  );
}
