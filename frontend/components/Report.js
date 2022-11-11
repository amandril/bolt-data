import styled from "styled-components";
import dateHelper from "../lib/dateHelper";

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

export default function Report({ report, bolt }) {
  return (
    <ReportStyle>
      <p>
        <em>ID: {report.id}</em>
      </p>
      <div>
        <span>
          Created by {report.user?.name || "n/a"} on {report.createdAt || "n/a"}
        </span>
      </div>
      <div>Type of report: {report.typeOfReport || "n/a"}</div>
      <div>Reported Hardware: {report.reportedHardware || "n/a"}</div>
      <div>Desc: {report.description}</div>
      <div>Number Replaced: {report.numReplaced}</div>
      <div>Hooks Installed: {report.hooksInstalled}</div>
      <div>Work Date: {report.workDate}</div>
      <div>Type of bolts: {report.typeOfBolts || "n/a"}</div>
      Photos:
      <div className="reportThumbs">
        <img width="100%" src={report.image?.image?.publicUrlTransformed} />
      </div>
    </ReportStyle>
  );
}
