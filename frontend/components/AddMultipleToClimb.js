import styled from "styled-components";
import { handleChange } from "../lib/useForm";

const AddMultipleFormStyling = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  .formHead,
  fieldset {
    display: grid;
    grid-template-columns: repeat(4, 80px) 80px 300px;
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
  }
`;

export default function AddMultipleToClimb({ id }) {
  const runCallback = (cb) => {
    return cb();
  };

  return (
    <AddMultipleFormStyling>
      <div className="formHead">
        <span>Pitch</span>
        <span>Position</span>
        <span>Use</span>
        <span>Type</span>
        <span>Condition</span>
        <span>Description</span>
      </div>
      {runCallback(() => {
        const row = [];
        for (var i = 0; i < 20; i++) {
          row.push(
            <fieldset>
              <span>{i}</span>
              <input
                required
                type="number"
                id="pitch"
                name="pitch"
                onChange={handleChange}
              />
              <input
                required
                type="number"
                id="position"
                name=""
                onChange={handleChange}
              />
              <select type="select" id="use" name="use" onChange={handleChange}>
                <option value="lead">Lead</option>
                <option value="anchor">Anchor</option>
                <option value="belay">Belay</option>
              </select>
              <select
                type="select"
                id="type"
                name="type"
                onChange={handleChange}
              >
                <option value="bolt">Bolt</option>
                <option value="pin">Pin</option>
                <option value="webbing">Webbing</option>
                <option value="other">Other</option>
              </select>
              <select
                type="select"
                id="condition"
                name="condition"
                onChange={handleChange}
              >
                <option value="bomber">Bomber</option>
                <option value="good">Good</option>
                <option value="average">Average</option>
                <option value="poor">Poor</option>
                <option value="unknown">Unknown</option>
              </select>
              <input
                required
                type="text"
                id="description"
                name="description"
                onChange={handleChange}
              />
            </fieldset>
          );
        }
        return row;
      })}
    </AddMultipleFormStyling>
  );
}
