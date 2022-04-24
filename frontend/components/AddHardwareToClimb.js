import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Router from "next/router";
import { SINGLE_CLIMB_QUERY } from "./SingleClimb.js";
import useForm from "../lib/useForm";
import styled from "styled-components";

const ADD_HARDWARE_TO_CLIMB_MUTATION = gql`
  mutation ADD_HARDWARE_TO_CLIMB_MUTATION(
    $id: ID!
    $position: Int!
    $condition: String!
  ) {
    createBolt(
      data: {
        position: $position
        condition: $condition
        climb: { connect: { id: $id } }
      }
    ) {
      id
      position
      condition
      climb {
        id
        name
      }
    }
  }
`;

const AddHardwareFormStyling = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 1px solid red;
  }
  fieldset {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    grid-gap: 20px;
    label {
      color: red;
      justify-self: start;
      display: grid;
      width: 100%;
      grid-template-columns: 1fr minmax(0, 300px);
      grid-gap: 20px;
      > {
        height: 50px;
        justify-self: end;
      }
      > input[type="radio"] {
        appearance: none;
        background-color: red;
      }
    }
    button {
      color: green;
      background-color: lightgreen;
      padding: 10px;
      font-size: 1rem;
      font-weight: bold;
      border-radius: 5px;
    }
  }
`;

export default function AddHardwareToClimb({ id }) {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    position: 1,
    condition: "unknown",
  });
  const [addHardware, { loading, error, data }] = useMutation(
    ADD_HARDWARE_TO_CLIMB_MUTATION,
    {
      refetchQueries: [{ query: SINGLE_CLIMB_QUERY, variables: { id } }],
    }
  );

  return (
    <AddHardwareFormStyling
      onSubmit={async (e) => {
        e.preventDefault();
        // Submit the inputfields to the backend:
        const res = await addHardware({
          variables: {
            id,
            position: inputs.position,
            condition: inputs.condition,
          },
        });
        clearForm();
        // Go to that route's page!
        console.log(res.data);
        Router.push({
          pathname: `../${res.data.createBolt.climb.id}`,
        });
      }}
    >
      {error && <div>{error}</div>}
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="position">
          Position
          <input
            required
            type="number"
            id="position"
            name="position"
            onChange={handleChange}
          />
        </label>
        <div>
          Condition
          <label>
            <input
              type="radio"
              value="poor"
              name="condition"
              id="condition"
              onChange={handleChange}
            />
            Poor
          </label>
        </div>

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

        <button type="submit">+ Add Hardware</button>
      </fieldset>
    </AddHardwareFormStyling>
  );
}

export { ADD_HARDWARE_TO_CLIMB_MUTATION };
