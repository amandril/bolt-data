import Link from "next/link";
import styled from "styled-components";
import Router from "next/router";
import React, { useState } from "react";
import Report from "./Report.js";
import AddReport from "./AddReport.js";

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
  button {
    padding: 5px 10px;
    background-color: lightgray;
    border: none;
    border-radius: 5px;
    font-size: 0.7rem;
  }
  .deleteButton {
    background-color: #ed8b76;
  }
  .editButton {
    background-color: #a7ecba;
  }
  .cardTop {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 1rem;
    align-items: center;
    padding: 1rem 0;
    margin-bottom: 1rem;
    border-bottom: 1px solid #cdcdcd;
  }
  .cardTop:hover > .editButtons {
    opacity: 1;
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
  .catTitle {
    color: #cdcdcd;
  }
  .boltDescription {
    font-size: 0.8rem;
    padding: 1rem;
    /* grid-column: span 2; */
  }
  .hardwareTags {
    font-size: 0.8rem;
    padding: 1rem;
    /* grid-column: span 2; */
    span {
      background-color: #eeeeee;
      border-radius: 5px;
      padding: 5px;
    }
  }
  .editButtons {
    opacity: 0.2;
    display: grid;
    /* justify-content: center; */
    grid-template-columns: repeat(2, minmax(0, 70px));
    grid-gap: 10px;
  }
  .addReport {
    display: none;
  }
`;

// const Report = styled.div`
//   font-size: 0.8rem;
//   padding: 1rem 2rem;
//   border-left: 1px solid #222222;
//   margin-top: 1rem;
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 1rem;
//   .reportThumbs {
//     display: grid;
//     grid-template-columns: repeat(3, minmax(0, 1fr));
//   }
//   :hover > .editButtons {
//     opacity: 1;
//   }
// `;

export default function BoltCard({ bolt }) {
  const [state, setState] = useState({
    showEdit: false,
  });
  console.log(bolt);

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
        // onMouseEnter={toggleEdit}
        // onMouseLeave={toggleEdit}
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
          className="editButtons"
          // style={{
          //   visibility: state.showEdit ? "visible" : "hidden",
          // }}
        >
          <Link
            href={{
              pathname: `./edit/${bolt.id}`,
              query: {
                name: bolt.climb.name,
                pitch: bolt.pitch,
                position: bolt.position,
                use: bolt.use,
                type: bolt.type,
                // description: bolt.description,
                condition: bolt.condition,
                installDate: bolt.installDate,
              },
            }}
          >
            <button className="editButton">Edit</button>
          </Link>
          <Link href={{ pathname: `/bolt/delete/${bolt.id}` }}>
            <button className="deleteButton">Remove</button>
          </Link>
        </div>
      </div>
      <div>
        <div className="cardLabel">Reports</div>
        <button
          onClick={() =>
            (document.querySelector(".addReport").style.display = "block")
          }
        >
          + Add a report
        </button>
        <div className="addReport">
          <AddReport climb={bolt.climb} bolt={bolt} />
        </div>
        {bolt.reports?.length > 0 ? (
          bolt.reports.map((report) => (
            <Report report={report} />
            // <Report key={report.id}>
            //   <div>
            //     <span>
            //       <strong>
            //         {report.createdAt} by {report.user?.name}
            //       </strong>
            //     </span>
            //   </div>
            //   <div>{report.description}</div>
            //   {report.image ? (
            //     <div className="reportThumbs">
            //       <img
            //         width="100%"
            //         src={report.image?.image.publicUrlTransformed}
            //       />
            //     </div>
            //   ) : (
            //     ""
            //   )}
            //   <div className="editButtons">
            //     <button className="editButton">Edit</button>
            //     <button className="deleteButton">Remove</button>
            //   </div>
            // </Report>
          ))
        ) : (
          <div>No reports</div>
        )}
      </div>
    </BoltCardStyle>
  );
}
