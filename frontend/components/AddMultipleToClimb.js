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
    grid-template-columns: repeat(5, 100px) 175px 50px;
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
  button.removeField {
    background-color: pink;
  }
`;

export default function AddMultipleToClimb({ id }) {
  const { clearForm, resetForm } = useForm({
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

  // Keep track of the duplicating inputs
  const [dupInput, setDupInput] = useState({
    pitch: 1,
    position: 1,
    use: "",
    type: "",
    condition: "",
    description: "",
  });

  function handleDupChange(e) {
    let { value, name } = e.target;
    if (type === "number") {
      value = parseInt(value);
    }
    setDupInput({
      // copy the existing state
      ...dupInput,
      [name]: value,
    });
  }

  // This copies the single input down the column
  const handleDuplicate = (e) => {
    let { value, name } = e.target;
    // Copy what's there, then update the fields with that name
    setFields(
      fields.map((field) => ({
        ...field,
        [name]: dupInput[name],
      }))
    );

    console.log(fields);
  };

  // This copies the whole fieldset
  const copyAll = () => {
    setFields(fields.map((field) => ({ id: field.id, ...dupInput })));
    console.log(fields);
  };

  const [fields, setFields] = useState([
    {
      id: 0,
      pitch: 1,
      position: 1,
      use: "",
      type: "",
      condition: "",
      description: "",
    },
  ]);

  const handleFieldInput = (e) => {
    let { value, name } = e.target;
    const fieldId = e.target.parentNode.id;
    // console.log(e.target.parentNode.id);

    setFields([...fields], [(fields[fieldId][name] = value)]);
    console.log(fields);
    console.log(fieldId);
  };

  const addField = () => {
    const newField = [...fields];
    newField.push({
      id: fields.length,
      pitch: 1,
      position: 1,
      use: "",
      type: "",
      condition: "",
      description: "",
    });
    setFields(newField);
  };

  const removeField = (e) => {
    e.preventDefault();
    console.log("Removing field ", e.target.parentNode.id);
  };

  return (
    <AddMultipleFormStyling>
      {/* This is the fieldset we want to use for duplicating down the column */}
      <button className="duplicateButton" onClick={toggleDuplicate}>
        Duplicate Fields
      </button>
      <div className={`duplicateFieldset-${duplicate ? "show" : "hide"}`}>
        <button type="button" name="copyAll" onClick={copyAll}>
          Copy All
        </button>
        <fieldset>
          <label htmlFor="pitch">
            <button type="button" name="pitch" onClick={handleDuplicate}>
              Copy
            </button>
            Pitch
            <input
              type="number"
              id="pitch"
              name="pitch"
              onChange={handleDupChange}
              // The onChange handler should work as usual

              // If the corresponding checkbox is checked, we want to run an event handler on each of the inputs below and copy the values from the duplicate fieldset inputs - that's where we want a ref, if any

              // Don't keep track of all the new fieldsets, just the duplicating fielset
            />
          </label>

          <label htmlFor="position">
            <button type="button" name="position" onClick={handleDuplicate}>
              Copy
            </button>
            Position
            <input
              // required
              type="number"
              id="position"
              name="position"
              onChange={handleDupChange}
            />
          </label>

          <label htmlFor="use">
            <button type="button" name="use" onClick={handleDuplicate}>
              Copy
            </button>
            Use
            <select
              type="select"
              id="use"
              name="use"
              defaultValue="select"
              onChange={handleDupChange}
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
            <button type="button" name="type" onClick={handleDuplicate}>
              Copy
            </button>
            Type
            <select
              type="select"
              id="type"
              name="type"
              defaultValue="select"
              onChange={handleDupChange}
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
            <button type="button" name="condition" onClick={handleDuplicate}>
              Copy
            </button>
            Condition
            <select
              type="select"
              id="condition"
              name="condition"
              defaultValue="select"
              onChange={handleDupChange}
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
            <button type="button" name="description" onClick={handleDuplicate}>
              Copy
            </button>
            Description
            <input
              // required
              type="text"
              id="description"
              name="description"
              onChange={handleDupChange}
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
        {fields.map((i) => {
          return (
            <fieldset id={i.id}>
              <input
                type="number"
                name="pitch"
                onChange={handleFieldInput}
                value={i.pitch}
              />
              <input
                // required
                type="number"
                name="position"
                onChange={handleFieldInput}
                value={i.position}
              />
              <select
                type="select"
                name="use"
                defaultValue="select"
                onChange={handleFieldInput}
                value={i.use}
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
                name="type"
                defaultValue="select"
                onChange={handleFieldInput}
                value={i.type}
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
                name="condition"
                defaultValue="select"
                onChange={handleFieldInput}
                value={i.condition}
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
                name="description"
                onChange={handleFieldInput}
                value={i.description}
              />
              <button className="removeField" onClick={removeField}>
                X
              </button>
            </fieldset>
          );
        })}
      </div>

      {/* End initial fielset */}

      <fieldset>
        <button className="addBoltButton" type="button" onClick={addField}>
          + Bolt
        </button>
      </fieldset>
      <button className="addHardwareButton" type="submit">
        + Add Hardware
      </button>
    </AddMultipleFormStyling>
  );
}
