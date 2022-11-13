// Bad hardware report - from climbers

import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Router from "next/router";
import styled from "styled-components";
import useForm from "../lib/useForm";

const GET_CLIMB = gql`
  query GET_CLIMB($id: ID!) {
    Climb(where: { id: $id }) {
      id
      fa
      name
    }
  }
`;

const HARDWARE_REPORT_MUTATION = gql`
  mutation HARDWARE_REPORT_MUTATION(
    $id: ID!
    $name: String
    $email: String
    $reportedHardware: String
    $where: String
    $problem: String
    $description: String
    $image: Upload
  ) {
    createReport(
      data: {
        climb: { connect: { id: $id } }
        # also need to make one for bolt
        typeOfReport: "report"
        name: $name
        email: $email
        reportedHardware: $reportedHardware
        where: $where
        problem: $problem
        description: $description
        image: { create: { image: $image, altText: $description } }
      }
    ) {
      climb {
        id
        name
        fa
      }
    }
  }
`;

// TODO: refactor styling for forms / share with AddHardwareToClimb styling
const HardwareReportStyling = styled.form`
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

export default function HardwareReport({ climb, bolt }) {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    description: "",
    image: "",
  });

  const { loading, data, error } = useQuery(GET_CLIMB, {
    variables: {
      id: climb.id,
    },
  });

  const [
    createHardwareReport,
    { hardwareLoading, hardwareData, hardwareError },
  ] = useMutation(HARDWARE_REPORT_MUTATION, {
    variables: {
      id: climb.id,
      name: inputs.name,
      email: inputs.email,
      reportedHardware: inputs.reportedHardware,
      where: inputs.where,
      problem: inputs.problem,
      description: inputs.description,
      image: inputs.image,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return error;

  if (hardwareLoading) return <p>Loading create hardware report</p>;
  if (hardwareError) return <p>Error for create hardware report</p>;

  return (
    <HardwareReportStyling
      onSubmit={async (e) => {
        e.preventDefault();
        // Submit the inputfields to the backend:
        const res = await createHardwareReport();
        console.log(res);
        clearForm();
        // Go to that route's page!
        Router.push({
          pathname: `../${res.data.createReport.climb.id}`,
        });
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="name">
          What is your name?
          <input
            required
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
          />
        </label>

        <label htmlFor="email">
          What is your email?
          <input
            required
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
          />
        </label>

        <label htmlFor="reportedHardware">
          What type of fixed hardware is it?
          <select
            type="select"
            id="reportedHardware"
            name="reportedHardware"
            onChange={handleChange}
          >
            <option value="default" hidden>
              Choose a Use
            </option>
            <option value="wedge">Wedge bolt</option>
            <option value="fivepiece">5 piece bolt</option>
            <option value="buttonhead">Button head bolt</option>
            <option value="gluein">Glue in bolt</option>
            <option value="other">Other</option>
            <option value="unknown">I don't know</option>
          </select>
        </label>

        <label htmlFor="where">
          Where is it on the climb?
          <div>Ex: 1st pitch, 3rd bolt</div>
          <input
            required
            type="text"
            id="where"
            name="where"
            onChange={handleChange}
          />
        </label>

        <label htmlFor="problem">
          What is wrong with the fixed hardware?
          <select
            type="select"
            id="problem"
            name="problem"
            onChange={handleChange}
          >
            <option value="default" hidden>
              Select problem
            </option>
            <option value="rusty">Rusty</option>
            <option value="spinner">Spinning hanger</option>
            <option value="worn">Excessive wear</option>
            <option value="missing">Missing (partially or fully)</option>
            <option value="improper">Old or improper hardware</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label htmlFor="description">
          Can you describe what you saw?
          <textarea
            name="description"
            id="description"
            onChange={handleChange}
          />
        </label>

        <label htmlFor="photo">
          Do you have a photo?
          <input type="file" name="image" id="image" onChange={handleChange} />
        </label>

        <button type="submit">Submit Report</button>
      </fieldset>
    </HardwareReportStyling>
  );
}
