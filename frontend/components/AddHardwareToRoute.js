import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Router from "next/router";
import { SINGLE_ROUTE_QUERY } from "./SingleRoute.js";
import useForm from "../lib/useForm";

const ADD_HARDWARE_TO_ROUTE_MUTATION = gql`
  mutation ADD_HARDWARE_TO_ROUTE_MUTATION(
    $id: ID!
    $position: Int!
    $condition: String!
  ) {
    createBolt(
      data: {
        position: $position
        condition: $condition
        route: { connect: { id: $id } }
      }
    ) {
      id
      position
      condition
      route {
        id
        route_name
      }
    }
  }
`;

export default function AddHardwareToRoute({ id }) {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    position: 1,
    condition: "average",
  });
  const [addHardware, { loading, error, data }] = useMutation(
    ADD_HARDWARE_TO_ROUTE_MUTATION,
    {
      refetchQueries: [{ query: SINGLE_ROUTE_QUERY, variables: { id } }],
    }
  );

  return (
    <form
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
          pathname: `../${res.data.createBolt.route.id}`,
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
        <label htmlFor="condition">
          Condition
          <select
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
          </select>
        </label>

        <button type="submit">+ Add Hardware</button>
      </fieldset>
    </form>
  );
}

export { ADD_HARDWARE_TO_ROUTE_MUTATION };
