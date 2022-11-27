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
  margin: 2rem 0;
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
    .fileUpload {
      position: relative;
      display: grid;
      grid-template-columns: 1fr;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 1.2rem;
      border: 2px solid #dedede;
      padding: 3rem;
      border-radius: 10px;
      width: 300px;
      height: 300px;
      color: #dedede;
      svg {
        width: 50%;
        justify-self: center;
        align-self: center;
        stroke-width: 1px;
      }
      input[type="file"] {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
    .fileUpload:hover {
      border: 2px solid #cdcdcd;
      color: #cdcdcd;
      background-color: #f9f9f9;
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
          pathname: `../allReports/${res.data.createReport.climb.id}`,
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

        <label htmlFor="fileUpload">
          Any photos?
          <div className="fileUpload">
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              class="stroke-gray-400 stroke-1 w-24 h-24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
              ></path>
            </svg>
            <div>Click to upload</div>
          </div>
        </label>

        <button type="submit">Submit Report</button>
      </fieldset>
    </HardwareReportStyling>
  );
}
