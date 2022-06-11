import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import useForm from "../lib/useForm";

const CLIMB_REPORT_MUTATION = gql`
  mutation CLIMB_REPORT_MUTATION(
    $climbId: ID!
    $userId: ID!
    $description: String!
  ) {
    createReport(
      data: {
        climb: { connect: { id: $climbId } }
        user: { connect: { id: $userId } }
        description: $description
        approved: true
      }
    ) {
      id
    }
  }
`;

const BOLT_REPORT_MUTATION = gql`
  mutation BOLT_REPORT_MUTATION(
    $climbId: ID!
    $boltId: ID!
    $userId: ID!
    $description: String!
  ) {
    createReport(
      data: {
        climb: { connect: { id: $climbId } }
        bolt: { connect: { id: $boltId } }
        user: { connect: { id: $userId } }
        description: $description
        approved: true
      }
    ) {
      id
    }
  }
`;

const ReportFormStyle = styled.form`
  fieldset {
    display: grid;
    grid-template-columns: 1fr;
    border: 0;
    margin: 0;
    padding: 0;
    label {
      display: grid;
      textarea {
        height: 150px;
        margin: 0.5rem 0;
      }
    }
    button {
      width: 200px;
    }
  }
  border-bottom: 1px solid #dddddd;
  padding-bottom: 2rem;
`;

export default function AddReport({ climb, bolt }) {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    description: "",
  });

  const [climbReport, { loading, data, error }] = useMutation(
    CLIMB_REPORT_MUTATION,
    {
      variables: {
        climbId: climb.id,
        userId: "624e6165082c4ae24cc22513",
        description: inputs.description,
      },
    }
  );

  const [boltReport, { boltloading, boltdata, bolterror }] = useMutation(
    BOLT_REPORT_MUTATION,
    {
      variables: {
        climbId: climb.id,
        boltId: bolt?.id,
        userId: "624e6165082c4ae24cc22513",
        description: inputs.description,
      },
    }
  );

  return (
    <div>
      <div className="boltClimbDesc">
        <span>{bolt?.position ? `Position ${bolt.position} on ` : ""}</span>
        <span>{climb?.name ? climb.name : ""}</span>
      </div>

      <ReportFormStyle
        onSubmit={async (e) => {
          e.preventDefault();
          // Submit the inputfields to the backend:

          const res = bolt ? await boltReport() : await climbReport();
          clearForm();
          console.log(res.data);
        }}
      >
        <fieldset>
          <label htmlFor="description">
            Description
            <textarea
              name="description"
              id="description"
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit Report</button>
        </fieldset>
      </ReportFormStyle>
    </div>
  );
}
