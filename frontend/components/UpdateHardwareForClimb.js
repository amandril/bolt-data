import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Router from "next/router";
import { SINGLE_CLIMB_QUERY } from "./SingleClimb.js";
import useForm from "../lib/useForm";
import styled from "styled-components";
import Link from "next/link";
import { SINGLE_BOLT_QUERY } from "./Bolt.js";

const UPDATE_HARDWARE_FOR_CLIMB_MUTATION = gql`
  mutation UPDATE_HARDWARE_FOR_CLIMB_MUTATION(
    $id: ID!
    $pitch: Int!
    $position: Int!
    $use: String!
    $type: String!
    $condition: String!
    $description: String!
    $lastUpdated: String!
  ) {
    updateBolt(
      id: $id
      data: {
        pitch: $pitch
        position: $position
        use: $use
        type: $type
        condition: $condition
        description: $description
        lastUpdated: $lastUpdated
      }
    ) {
      id
      pitch
      position
      use
      type
      condition
      description
      installDate
      lastUpdated
      climb {
        id
        name
      }
    }
  }
`;

const UpdateHardwareFormStyling = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  fieldset {
    border: 0;
    background-color: #ffffff;
    display: block;
    clip-path: inset(0 0 0 0 round 10px);
    display: grid;
    grid-template-columns: minmax(0, 300px);
    justify-items: center;
    grid-gap: 40px;
    padding: 40px;
    label {
      color: #222222;
      font-size: 1rem;
      display: grid;
      grid-gap: 0.5rem;
      grid-template-columns: 1fr;
      justify-content: start;
      width: 100%;
      input {
        height: 2rem;
      }
      input,
      textarea,
      select {
        display: block;
        padding: 1.5rem 1rem;
        /* margin: 1rem; */
        border-radius: 5px;
        font-size: 1rem;
        border: 2px solid #dddddd;
      }
      textarea {
        height: 15rem;
        resize: none;
      }
    }
    button {
      color: green;
      background-color: lightgreen;
      padding: 1rem 2rem;
      margin: 1rem 0;
      font-size: 1rem;
      font-weight: bold;
      border-radius: 5px;
      border: 0;
    }
  }
`;

const ConditionRadioStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  color: #222222;
  font-size: 1rem;
  :root {
    --condition-radio-color: #222222;
  }
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  .poor {
    background-color: var(--poorColor);
  }
  .average {
    background-color: var(--averageColor);
  }
  .good {
    background-color: var(--goodColor);
  }
  .bomber {
    background-color: var(--bomberColor);
  }
  .unknown {
    background-color: var(--unknownColor);
  }
  .radioWrap {
    display: block;
    clip-path: inset(0 0 0 0 round 10px);
  }
  .condition {
    display: grid;
    grid-template-columns: 1em auto;
    justify-content: space-between;
    padding: 1rem;
    font-size: 0.8rem;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.5);
    input[type="radio"] {
      appearance: none;
      --webkit-appearance: none;
      border: 0.15rem solid rgba(0, 0, 0, 0.5);
      height: 1.5rem;
      width: 1.5rem;
      border-radius: 50%;
      padding: 0;
      display: grid;
      place-content: center;
    }
    input[type="radio"]::before {
      content: "";
      width: 1em;
      height: 1em;
      border-radius: 50%;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em rgba(0, 0, 0, 0.5);
    }
    input[type="radio"]:checked::before {
      transform: scale(1);
    }
  }
`;

export default function UpdateHardwareForClimb({ id, bolt }) {
  const { inputs, handleChange, clearForm } = useForm({
    position: 1,
    condition: "unknown",
    pitch: 1,
    use: "lead",
    type: "bolt",
    description: "",
    installDate: "",
  });
  const [updateBolt, { loading, error, data }] = useMutation(
    UPDATE_HARDWARE_FOR_CLIMB_MUTATION,
    {
      refetchQueries: [{ query: SINGLE_BOLT_QUERY, variables: { id } }],
    }
  );

  const { pitch, position, use, type, description, condition, installDate } =
    bolt;

  const today = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US");
  };

  return (
    <UpdateHardwareFormStyling
      onSubmit={async (e) => {
        e.preventDefault();
        // Submit the inputfields to the backend:
        const res = await updateBolt({
          variables: {
            id,
            pitch: inputs.pitch,
            position: inputs.position,
            use: inputs.use,
            type: inputs.type,
            condition: inputs.condition,
            description: inputs.description,
            installDate: inputs.installDate,
            lastUpdated: today(),
          },
        });
        clearForm();
        // Go to that route's page!
        console.log(res.data);
        Router.push({
          pathname: `../${res.data.updateBolt.bolt.id}`,
        });
      }}
    >
      {error && <div>{error}</div>}
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="pitch">
          Pitch
          <input
            required
            type="number"
            id="pitch"
            name="pitch"
            value={pitch}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="position">
          Position
          <input
            required
            type="number"
            id="position"
            name="position"
            value={position}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="use">
          Use
          <select
            type="select"
            id="use"
            name="use"
            value={use}
            onChange={handleChange}
          >
            <option value="lead">Lead</option>
            <option value="anchor">Anchor</option>
            <option value="belay">Belay</option>
          </select>
        </label>

        <label htmlFor="type">
          Type
          <select
            type="select"
            id="type"
            name="type"
            value={type}
            onChange={handleChange}
          >
            <option value="bolt">Bolt</option>
            <option value="pin">Pin</option>
            <option value="webbing">Webbing</option>
            <option value="other">Other</option>
          </select>
        </label>

        <ConditionRadioStyles>
          <p>Condition</p>
          <div className="radioWrap">
            <label className="condition poor" htmlFor="poor">
              Poor
              <input
                type="radio"
                value="poor"
                name="condition"
                id="poor"
                onChange={handleChange}
              />
            </label>
            <label className="condition average" htmlFor="average">
              Average
              <input
                type="radio"
                value="average"
                name="condition"
                id="average"
                onChange={handleChange}
              />
            </label>
            <label className="condition good" htmlFor="good">
              Good
              <input
                type="radio"
                value="good"
                name="condition"
                id="good"
                onChange={handleChange}
              />
            </label>
            <label className="condition bomber" htmlFor="bomber">
              Bomber
              <input
                type="radio"
                value="bomber"
                name="condition"
                id="bomber"
                onChange={handleChange}
              />
            </label>
            <label className="condition unknown" htmlFor="unknown">
              Unknown
              <input
                type="radio"
                value="unknown"
                name="condition"
                id="unknown"
                onChange={handleChange}
              />
            </label>
          </div>
        </ConditionRadioStyles>

        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="installDate">
          Install Date
          <input
            type="date"
            id="installDate"
            name="installDate"
            value={installDate}
            onChange={handleChange}
          />
        </label>

        {/* <select
            type="select"
            id="condition"
            name="condition"
            placeholder="Condition"
            onChange={handleChange}
          >
            <option value="unknown">Unknown</option>
            <option value="poor">Poor</option>
            <option value="average">Average</option>
            <option value="good">Good</option>
            <option value="bomber">Bomber</option>
          </select> */}

        <button type="submit">Update Hardware</button>
      </fieldset>
    </UpdateHardwareFormStyling>
  );
}

export { UPDATE_HARDWARE_FOR_CLIMB_MUTATION };
