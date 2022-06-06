import Link from "next/link";
import styled from "styled-components";
import React, { useState } from "react";

const BoltCardStyle = styled.div`
  background-color: #ffffff;
  display: grid;
  grid-template-columns: 1fr;
  /* justify-items: center; */
  padding: 1rem;
  margin: 2rem;
  border-radius: 5px;
  width: 650px;
  > div {
    margin: 0.5rem 2rem;
  }
  .cardTop {
    display: grid;
    grid-template-columns: 3fr 2fr 0.5fr;
    gap: 1rem;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid #eeeeee;
  }
  .boltStats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1.5rem;
    justify-items: center;
    .boltStat {
      display: grid;
      grid-template-columns: 1fr;
      justify-items: center;
      grid-gap: 0.4rem;
      .boltStatName {
        font-size: 0.8rem;
        color: #cdcdcd;
        line-height: 0.5rem;
      }
      .boltStatValue {
        font-size: 0.9rem;
        color: #222222;
        font-weight: bold;
      }
    }
  }
  .editBolt {
    font-size: 0.8rem;
    border: 1px solid #222222;
    border-radius: 5px;
    text-align: center;
    opacity: 0.4;
    visibility: visible;
  }
`;

const Report = styled.div`
  font-size: 0.8rem;
  padding: 1rem 2rem;
  border-left: 1px solid #222222;
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  .reportThumbs {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export default function BoltCard({ bolt }) {
  const [state, setState] = useState({
    showEdit: false,
  });

  const toggleEdit = () => {
    setState({
      showEdit: !state.showEdit,
    });
    // console.log("updated - ", state);
  };

  return (
    <BoltCardStyle>
      <div
        className="cardTop"
        onMouseEnter={toggleEdit}
        onMouseLeave={toggleEdit}
      >
        <div className="boltStats">
          <div className="boltStat">
            <span className="boltStatName">pitch</span>
            <span className="boltStatValue">{bolt.pitch}</span>
          </div>
          <div className="boltStat">
            <span className="boltStatName">position</span>
            <span className="boltStatValue">{bolt.position}</span>
          </div>
          <div className="boltStat">
            <span className="boltStatName">use</span>
            <span className="boltStatValue">{bolt.use}</span>
          </div>
          <div className="boltStat">
            <span className="boltStatName">type</span>
            <span className="boltStatValue">{bolt.type}</span>
          </div>
        </div>
        <div className={`boltConditionBar ${bolt.condition}`}>
          {bolt.condition}
        </div>
        <div
          className="editBolt"
          style={{
            visibility: state.showEdit ? "visible" : "hidden",
          }}
        >
          edit
        </div>
      </div>
      <div>
        <span className="cardLabel">Reports</span>
        {bolt.reports?.length > 0 ? (
          bolt.reports.map((report) => (
            <Report>
              <div>
                <span>
                  <strong>
                    {report.createdAt} by {report.user?.name}
                  </strong>
                </span>
              </div>
              <div>{report.description}</div>
              <div className="reportThumbs">
                <img
                  width="100%"
                  src={report.image.image.publicUrlTransformed}
                />
              </div>
            </Report>
          ))
        ) : (
          <div>No reports</div>
        )}
      </div>
    </BoltCardStyle>
  );
}
