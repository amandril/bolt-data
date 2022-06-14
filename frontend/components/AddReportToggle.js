import styled from "styled-components";

const AddReportToggleStyle = styled.div`
  display: inline-block;
  float: right;
  color: #222222;
  opacity: 0.7;
  .addReportButton {
    background-color: #eeeeee;
    border-radius: 10px;
    display: block;
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
`;

export default function AddReportToggle() {
  return (
    <AddReportToggleStyle>
      <button
        className="closeReportArea"
        onClick={() => (
          // TODO: Replace this with refs and state
          document.querySelector(".addReport").classList.toggle("reportShow"),
          (document.querySelector(".closeReportArea").style.display = "none"),
          (document.querySelector(".addReportButton").style.display = "block")
        )}
      >
        X
      </button>
      <button
        className="addReportButton"
        onClick={() => (
          // TODO: Replace this with refs and state
          document.querySelector(".addReport").classList.toggle("reportShow"),
          (document.querySelector(".addReportButton").style.display = "none"),
          (document.querySelector(".closeReportArea").style.display = "block")
        )}
      >
        + Add a report
      </button>
    </AddReportToggleStyle>
  );
}
