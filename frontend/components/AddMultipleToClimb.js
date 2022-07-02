import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useForm from "../lib/useForm";
import jsxToString from "jsx-to-string";

const AddMultipleFormStyling = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  .formHead,
  fieldset {
    display: grid;
    grid-template-columns: repeat(5, 100px) 175px;
    border: 0;
    /* justify-content: center; */
    grid-gap: 20px;
    input,
    textarea,
    label,
    select {
      display: block;
      width: 100%;
      padding: 0;
      /* margin: 1rem; */
      border-radius: 5px;
      font-size: 1rem;
    }
    input,
    select {
      border: 2px solid #dddddd;
      padding: 1rem 0.5rem;
    }
  }
  button {
    padding: 15px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    color: #666666;
    background-color: #d8d8d8;
  }
  button:hover {
    opacity: 0.8;
  }
  .addHardwareButton {
    background-color: lightgreen;
    justify-self: center;
  }
  button.duplicateButton {
    background-color: lightgray;
    justify-self: end;
  }
  .duplicateFieldset-show {
    display: block;
    margin-bottom: 2rem;
    background-color: pink;
    padding: 1rem 0;
  }
  .duplicateFieldset-hide {
    display: none;
  }
`;

export default function AddMultipleToClimb({ id }) {
  const { inputs, handleChange, handleDuplicateChange, clearForm, resetForm } =
    useForm({
      // position: 1,
      // condition: "unknown",
      // pitch: 1,
      // use: "lead",
      // type: "bolt",
      // // description: "",
      // installDate: "",
    });

  // Keep track of whether the duplicating fieldset is visible
  const [duplicate, setDuplicate] = useState(false);

  const toggleDuplicate = (e) => {
    e.preventDefault();
    setDuplicate(!duplicate);
  };

  // Keep track of whether the pitch checkbox is true or false
  const [pitch, setPitch] = useState(false);

  const pitchDuplicate = () => {
    setPitch(!pitch);
    handleDuplicateChange();
  };

  const pitchRef = useCallback((node) => {
    if (node !== null) {
      console.log("ref", node); // node = elRef.current
    }
  }, []);

  // -------------------------------------------------------
  // For adding new fields and the initial fields to the form
  const fieldSet = () => (
    <fieldset>
      <input type="number" id="pitch" name="pitch" onChange={handleChange} />
      <input
        // required
        type="number"
        id="position"
        name="position"
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
    </fieldset>
  );

  // let initialFields = [];
  // for (let i = 0; i < 5; i++) {
  //   initialFields.push(fieldSet());
  // }

  const addFields = (e) => {
    e.preventDefault();
    console.log("adding fields");
    document.querySelector(".multiFields").innerHTML += jsxToString(fieldSet());
  };

  return (
    <AddMultipleFormStyling>
      {/* This is the fieldset we want to use for duplicating down the column */}
      <button className="duplicateButton" onClick={toggleDuplicate}>
        Duplicate All Fields
      </button>
      <div className={`duplicateFieldset-${duplicate ? "show" : "hide"}`}>
        <fieldset>
          <label htmlFor="pitch">
            <input type="checkbox" name="pitch" onChange={pitchDuplicate} />
            Pitch
            <input
              type="number"
              id="pitch"
              name="pitch"
              ref={pitchRef}
              onChange={handleChange}
              // The onChange handler should work as usual

              // If the corresponding checkbox is checked, we want to run an event handler on each of the inputs below and copy the values from the duplicate fieldset inputs - that's where we want a ref, if any

              // Don't keep track of all the new fieldsets, just the duplicating fielset
            />
          </label>

          <label htmlFor="position">
            <input type="checkbox" name="position" />
            Position
            <input
              // required
              type="number"
              id="position"
              name="position"
              onChange={handleChange}
            />
          </label>

          <label htmlFor="use">
            <input type="checkbox" name="use" />
            Use
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
          </label>

          <label htmlFor="type">
            <input type="checkbox" name="type" />
            Type
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
          </label>

          <label htmlFor="condition">
            <input type="checkbox" name="condition" />
            Condition
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
          </label>

          <label htmlFor="description">
            <input type="checkbox" name="description" />
            Description
            <input
              // required
              type="text"
              id="description"
              name="description"
              onChange={handleChange}
            />
          </label>
        </fieldset>
      </div>
      {/* End duplicating fieldset */}

      {/* Initial fieldset */}
      <div className="formHead">
        <span>Pitch</span>
        <span>Position</span>
        <span>Use</span>
        <span>Type</span>
        <span>Condition</span>
        <span>Description</span>
      </div>
      {/* <div className="multiFields">{initialFields}</div> */}
      <div className="multiFields">
        <fieldset>
          <input
            type="number"
            id="pitch1"
            name="pitch1"
            onChange={handleChange}
          />
          <input
            // required
            type="number"
            id="position1"
            name="position1"
            onChange={handleChange}
          />
          <select
            type="select"
            id="use1"
            name="use1"
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
            id="type1"
            name="type1"
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
            id="condition1"
            name="condition1"
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
            id="description1"
            name="description1"
            onChange={handleChange}
          />
        </fieldset>
        <fieldset>
          <input
            type="number"
            id="pitch2"
            name="pitch2"
            onChange={handleChange}
          />
          <input
            // required
            type="number"
            id="position2"
            name="position2"
            onChange={handleChange}
          />
          <select
            type="select"
            id="use2"
            name="use2"
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
            id="type2"
            name="type2"
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
            id="condition2"
            name="condition2"
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
            id="description2"
            name="description2"
            onChange={handleChange}
          />
        </fieldset>
      </div>
      {/* End initial fielset */}

      <fieldset>
        <button className="addBoltButton" type="button" onClick={addFields}>
          + Bolt
        </button>
      </fieldset>
      <button className="addHardwareButton" type="submit">
        + Add Hardware
      </button>
    </AddMultipleFormStyling>
  );
}
