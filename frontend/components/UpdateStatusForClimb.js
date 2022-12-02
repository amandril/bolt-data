import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Router from "next/router";
import styled from "styled-components";
import useForm from "../lib/useForm";
import { ReportButton } from "./styles/Button";

const UPDATE_STATUS_MUTATION = gql`
  mutation UPDATE_STATUS_MUTATION($id: ID!, $status: String) {
    updateClimb(id: $id, data: { status: $status }) {
      name
    }
  }
`;

const StatusStyle = styled.div`
  display: grid;
  text-align: center;
  gap: 1rem;
  margin: 1rem;
  justify-content: center;
  form {
    display: grid;
    grid-template-columns: minmax(0, 200px);
    justify-content: center;
    gap: 1rem;
    select {
      padding: 0.5rem;
      font-size: 1rem;
      font-weight: bold;
    }
    button {
      padding: 0.5rem;
      font-weight: bold;
      background-color: lightgreen;
      border-radius: 5px;
    }
  }
`;

export default function UpdateStatusForClimb({ climb }) {
  const { inputs, handleChange } = useForm({
    status: climb.status,
  });

  const [updateStatus, { loading, data, error }] = useMutation(
    UPDATE_STATUS_MUTATION
  );

  return (
    <StatusStyle>
      <div>
        Update the status for <strong>{climb.name}</strong>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await updateStatus({
            variables: {
              id: climb.id,
              status: inputs.status,
            },
          });
          Router.push({
            pathname: `../${climb.id}`,
          });
        }}
      >
        <select
          type="select"
          id="status"
          name="status"
          value={inputs.status || ""}
          onChange={handleChange}
        >
          <option value="default" hidden>
            Select status
          </option>
          <option value="idle">Done / Idle</option>
          <option value="assess">Assess Further</option>
          <option value="requiresWork">Requires Work</option>
          <option value="inProgress">Work in Progress</option>
        </select>
        <button type="submit">Update</button>
      </form>
    </StatusStyle>
  );
}
