import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Router from "next/router";
import styled from "styled-components";
import useForm from "../lib/useForm";
import { SINGLE_CLIMB_QUERY } from "./SingleClimb";
import { SINGLE_BOLT_QUERY } from "./Bolt";
import { useEffect, useRef, useState } from "react";
import { render } from "nprogress";

const CLIMB_REPORT_MUTATION = gql`
  mutation CLIMB_REPORT_MUTATION(
    $climbId: ID!
    $userId: ID!
    $description: String
    $image: Upload
  ) {
    createReport(
      data: {
        climb: { connect: { id: $climbId } }
        user: { connect: { id: $userId } }
        description: $description
        approved: true
        image: { create: { image: $image, altText: $description } }
      }
    ) {
      climb {
        id
      }
    }
  }
`;

const BOLT_REPORT_MUTATION = gql`
  mutation BOLT_REPORT_MUTATION(
    $climbId: ID!
    $boltId: ID!
    $userId: ID!
    $description: String
    $image: Upload
  ) {
    createReport(
      data: {
        climb: { connect: { id: $climbId } }
        bolt: { connect: { id: $boltId } }
        user: { connect: { id: $userId } }
        description: $description
        approved: true
        image: { create: { image: $image, altText: $description } }
      }
    ) {
      bolt {
        id
      }
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
      font-size: 0.8rem;
      color: #cdcdcd;
      margin-bottom: 1rem;
      select {
        width: 10rem;
      }
      textarea {
        height: 150px;
        margin: 0.5rem 0;
        border: 2px solid #eeeeee;
        border-radius: 10px;
        resize: none;
        padding: 10px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      }
    }
    button {
      width: 200px;
    }
  }
  border-bottom: 1px solid #dddddd;
  padding-bottom: 2rem;
`;
const AddReportStyle = styled.div`
  height: ${(props) => (props.className === "reportShow" ? "400px" : "0")};
  overflow: hidden;
  transition: height 0.3s;
  margin-bottom: 2rem;
`;

const AddReportToggleStyle = styled.div`
  display: inline-block;
  float: right;
  color: #222222;
  opacity: 0.7;
  .addReportButton {
    background-color: #eeeeee;
    border-radius: 10px;
    display: none;
    font-weight: bold;
  }
  .addReportButton:hover {
    background-color: #dddddd;
  }
  .closeReportArea {
    border-radius: 40%40%40%40%;
    display: none;
    font-weight: bold;
    background-color: #dddddd;
  }
  .closeReportArea:hover {
    background-color: pink;
  }
  .show {
    display: block;
  }
`;

export default function AddReport({ climb, bolt, toggle }) {
  const [isActive, setActive] = useState(!toggle);

  const addReportNode = useRef(null),
    closeReportButtonNode = useRef(null),
    addReportButtonNode = useRef(null);

  useEffect(() => {});

  const handleClick = () => {
    setActive(!isActive);
  };

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    description: "",
    image: "",
  });

  const [climbReport, { loading, data, error }] = useMutation(
    CLIMB_REPORT_MUTATION,
    {
      variables: {
        climbId: climb.id,
        userId: "624e6165082c4ae24cc22513",
        description: inputs.description,
        image: inputs.image,
      },
      refetchQueries: [
        { query: SINGLE_CLIMB_QUERY, variables: { id: climb.id } },
      ],
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
        image: inputs.image,
      },
      refetchQueries: [
        { query: SINGLE_BOLT_QUERY, variables: { id: bolt?.id } },
      ],
    }
  );

  const renderButtons = () => {
    return (
      <AddReportToggleStyle>
        <button
          className={`closeReportArea ${isActive ? "show" : null}`}
          ref={closeReportButtonNode}
          onClick={handleClick}
        >
          X
        </button>
        <button
          className={`addReportButton ${isActive ? null : "show"}`}
          ref={addReportButtonNode}
          onClick={handleClick}
        >
          + Add a report
        </button>
      </AddReportToggleStyle>
    );
  };

  return (
    <>
      {toggle ? renderButtons() : ""}
      <AddReportStyle
        ref={addReportNode}
        className={isActive ? "reportShow" : null}
      >
        {/* <div className="boltClimbDesc">
        <span>{bolt?.position ? `Position ${bolt.position} on ` : ""}</span>
        <span>{climb?.name ? climb.name : ""}</span>
      </div> */}
        <ReportFormStyle
          onSubmit={async (e) => {
            e.preventDefault();
            // Submit the inputfields to the backend:

            const res = bolt ? await boltReport() : await climbReport();
            clearForm();
            console.log(res.data);
            Router.push({
              pathname: `${
                bolt
                  ? "./" + res.data.createReport.bolt?.id
                  : "../climb/" + res.data.createReport.climb?.id
              }`,
            });
            handleClick();
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
            <label htmlFor="photo">
              Photo
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleChange}
              />
            </label>
            <label htmlFor="climbStatus">
              Climb Status
              <select>
                <option value="done">Done / Idle</option>
                <option value="assess">Assess Further</option>
                <option value="requiresWork">Requires Work</option>
                <option value="inProgress">In Progress</option>
              </select>
            </label>
            <button type="submit">Submit Report</button>
          </fieldset>
        </ReportFormStyle>
      </AddReportStyle>
    </>
  );
}
