import Link from "next/link";
import styled from "styled-components";
import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Router from "next/router.js";

const REMOVE_HARDWARE_MUTATION = gql`
  mutation REMOVE_HARDWARE_MUTATION($id: ID!) {
    deleteBolt(id: $id) {
      climb {
        id
      }
    }
  }
`;

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
    .bottomBorder {
      border-bottom: 1px solid #dddddd;
    }
  }
  button {
    padding: 5px 10px;
    background-color: lightgray;
    border: none;
    border-radius: 5px;
    font-size: 0.7rem;
  }
  .removeButton {
    background-color: #ed8b76;
  }
  .editButton {
    background-color: #f6db6c;
  }
  .cardTop {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 1rem;
    align-items: center;
    padding: 1rem 0;
  }
  /* .cardTop:hover > .editButtons {
    opacity: 1;
  } */
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
    display: grid;
    padding: 1rem;
    .descTitle {
      font-size: 0.8rem;
      color: #cdcdcd;
    }
    .description {
      font-size: 0.9rem;
    }

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
    display: grid;
    /* justify-content: center; */
    grid-template-columns: repeat(2, minmax(0, 70px));
    grid-gap: 10px;
    button {
      opacity: 0.4;
      font-weight: bold;
      color: #222222;
    }
  }
  .editButtons > button:hover {
    opacity: 1;
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
  // console.log(bolt);

  const toggleEdit = () => {
    setState({
      showEdit: !state.showEdit,
    });
    // console.log("updated - ", state);
  };

  const [removeHardware, { loading, data, error }] = useMutation(
    REMOVE_HARDWARE_MUTATION
  );

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
        {bolt.description ? (
          <div className="boltDescription">
            <span className="descTitle">Description</span>
            <span className="description">{bolt.description}</span>
          </div>
        ) : (
          ""
        )}
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
                description: bolt.description,
                condition: bolt.condition,
                installDate: bolt.installDate,
              },
            }}
          >
            <button className="editButton">Edit</button>
          </Link>
          {/* Modal / popup to confirm removing the bolt - use component with mutation right here */}
          <button
            className="removeButton"
            onClick={async (e) => {
              e.preventDefault();
              let conf = await confirm("Are you sure?");
              if (conf) {
                const res = await removeHardware({
                  variables: {
                    id: bolt.id,
                  },
                });
                console.log(res.data.deleteBolt.climb.id);
                Router.push({
                  pathname: `../climb/${res.data.deleteBolt.climb.id}`,
                });
              }
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </BoltCardStyle>
  );
}
