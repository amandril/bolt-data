import styled from "styled-components";
import dateHelper from "../lib/dateHelper";

const ReportStyle = styled.div`
  font-size: 0.8rem;
  padding: 2rem 2rem;
  /* border-left: 1px solid #222222; */
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  background-color: #ffffff;
  border-radius: 5px;
  /* border-bottom: 1px solid #dddddd; */
  .reportThumbs {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .reportInfo {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;
  }
  .reportType {
    padding: 5px;
    border-radius: 5px;
    font-weight: bold;
  }
  .hardware-report {
    background-color: orange;
  }
  .work-report {
    background-color: lightblue;
  }
`;

export default function Report({ report, bolt }) {
  // Hardware report rendering
  if (report.typeOfReport == "report")
    return (
      <ReportStyle>
        <div className="reportInfo">
          <div className="reportType hardware-report">Hardware</div>
          <div>
            {report.email || "n/a"} on {dateHelper(report.createdAt) || "n/a"}
          </div>
        </div>
        <div>Hardware: {report.reportedHardware || "n/a"}</div>
        <div>Location: {report.where || "n/a"}</div>
        <div>Problem: {report.problem || "n/a"}</div>
        <div>Problem: {report.problem || "n/a"}</div>
        <div>Description: {report.description}</div>
        {report.images ? "Photos" : ""}
        <div className="reportThumbs">
          <img width="100%" src={report.image?.image?.publicUrlTransformed} />
        </div>
      </ReportStyle>
    );

  // Work report rendering
  if (report.typeOfReport == "work")
    return (
      <ReportStyle>
        <div className="reportInfo">
          <div className="reportType work-report">Work</div>
          <div>
            {dateHelper(report.createdAt) || "n/a"} by{" "}
            {report.user?.name || report.name}
          </div>
        </div>
        <div>Work Date: {dateHelper(Math.floor(report.workDate))}</div>
        <div>Number Replaced: {report.numReplaced || "n/a"}</div>
        <div>Hooks Installed: {report.hooksInstalled || "n/a"}</div>
        <div>Type of bolts: {report.typeOfBolts || "n/a"}</div>
        <div>Volunteer hours: {report.volunteerHours || "n/a"}</div>
        <div>Description: {report.description || "n/a"}</div>
        Photos:
        <div className="reportThumbs">
          <img width="100%" src={report.image?.image?.publicUrlTransformed} />
        </div>
      </ReportStyle>
    );
  else return null;
}
