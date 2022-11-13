// Work Report - from rebolters, work completed

import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Router from "next/router";
import styled from "styled-components";
import useForm from "../lib/useForm";

const ReportStyle = styled.div`
  font-size: 0.8rem;
  padding: 1rem 0 3rem;
  /* border-left: 1px solid #222222; */
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  /* border-bottom: 1px solid #dddddd; */
  .reportThumbs {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const GET_CLIMB = gql`
  query GET_CLIMB($id: ID!) {
    Climb(where: { id: $id }) {
      id
      fa
      name
    }
  }
`;

const WORK_REPORT_MUTATION = gql`
  mutation WORK_REPORT_MUTATION(
    $id: ID!
    # $user: ID
    $name: String
    $email: String
    $workDate: String
    $numReplaced: Int
    $typeOfBolts: String
    $hooksInstalled: Int
    $volunteerHours: String
    $otherVolunteers: String
    $description: String
    $image: Upload
  ) {
    createReport(
      data: {
        climb: { connect: { id: $id } }
        typeOfReport: "work"
        # user: $user
        name: $name
        email: $email
        workDate: $workDate
        numReplaced: $numReplaced
        typeOfBolts: $typeOfBolts
        hooksInstalled: $hooksInstalled
        volunteerHours: $volunteerHours
        otherVolunteers: $otherVolunteers
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

export default function WorkReport({ climb, bolt }) {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    description: "",
  });

  const { loading, data, error } = useQuery(GET_CLIMB, {
    variables: {
      id: climb.id,
    },
  });

  const [createWorkReport, { workLoading, workData, workError }] = useMutation(
    WORK_REPORT_MUTATION,
    {
      variables: {
        id: climb.id,
        name: inputs.name,
        email: inputs.email,
        numReplaced: inputs.numReplaced,
        typeOfBolts: inputs.typeOfBolts,
        hooksInstalled: inputs.hooksInstalled,
        volunteerHours: inputs.volunteerHours,
        otherVolunteers: inputs.otherVolunteers,
        description: inputs.description,
      },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return error;

  if (workLoading) return <p>Loading create hardware report</p>;
  if (workError) return <p>Error for create hardware report</p>;

  return (
    <HardwareReportStyling
      onSubmit={async (e) => {
        e.preventDefault();
        // Submit the inputfields to the backend:
        const res = await createWorkReport();
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

        <label htmlFor="numReplaced">
          How many fixed anchors were replaced?
          <input
            type="number"
            id="numReplaced"
            name="numReplaced"
            onChange={handleChange}
          />
        </label>

        <label htmlFor="typeOfBolts">
          What type of bolts were used?
          <select
            type="select"
            id="typeOfBolts"
            name="typeOfBolts"
            onChange={handleChange}
          >
            <option value="default" hidden>
              Type of bolt
            </option>
            <option value="mechanical">Mechanical</option>
            <option value="gluein">Glue in</option>
          </select>
        </label>

        <label htmlFor="hooksInstalled">
          How many hooks/lower offs were installed?
          <input
            required
            type="number"
            id="hooksInstalled"
            name="hooksInstalled"
            onChange={handleChange}
          />
        </label>

        <label htmlFor="volunteerHours">
          How many hours did the project take?
          <input
            required
            type="text"
            id="volunteerHours"
            name="volunteerHours"
            onChange={handleChange}
          />
        </label>

        <label htmlFor="otherVolunteers">
          Please list other volunteers
          <input
            required
            type="text"
            id="otherVolunteers"
            name="otherVolunteers"
            onChange={handleChange}
          />
        </label>

        <label htmlFor="description">
          <div>Notes?</div>
          <div>
            What type of hardware was placed? Did you replace the whole route or
            just part of it? Are there fixed anchors that still need replacement
            on the climb?
          </div>
          <textarea
            name="description"
            id="description"
            onChange={handleChange}
          />
        </label>

        <label htmlFor="photo">
          Any photos?
          <input type="file" name="image" id="image" onChange={handleChange} />
        </label>

        <button type="submit">Submit Report</button>
      </fieldset>
    </HardwareReportStyling>
  );
}
