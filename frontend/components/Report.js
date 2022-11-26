import styled from "styled-components";
import dateHelper from "../lib/dateHelper";

const ReportStyle = styled.div`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 5px;
  font-size: 0.9rem;
  margin: 2rem 0;
  .noReportType {
    color: red;
  }
  table.reportTable {
    display: grid;
    grid-template-rows: auto;
    gap: 1.5rem;
    tr {
      display: grid;
      grid-template-columns: 130px 1fr;
      gap: 3rem;
      td:first-child {
        font-weight: bold;
      }
      .hardware-report {
        background-color: #cd6f00;
        color: #ffffff;
      }
      .work-report {
        background-color: lightblue;
      }
      .reportType {
        display: grid;
        justify-content: center;
        border-radius: 5px;
        font-weight: bold;
        width: 5rem;
        font-size: 0.8rem;
      }
      .reportThumbs {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        > img {
          border-radius: 5px;
        }
      }
    }
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
      <>
        <ReportStyle>
          <div>
            <table className="reportTable">
              <tr>
                <td>Report type</td>
                <td>
                  <div className="reportType hardware-report">Hardware</div>
                </td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{report.name}</td>
              </tr>
              <tr>
                <td># Replaced</td>
                <td>{report.numReplaced}</td>
              </tr>
              <tr>
                <td>Type of bolts</td>
                <td>{report.typeOfBolts}</td>
              </tr>
              <tr>
                <td>Hooks installed</td>
                <td>{report.hooksInstalled}</td>
              </tr>
              <tr>
                <td>Volunteer hours</td>
                <td>{report.volunteerHours}</td>
              </tr>
              <tr>
                <td>Other volunteers</td>
                <td>{report.otherVolunteers}</td>
              </tr>
              <tr>
                <td>Work Date</td>
                <td>{dateHelper(report.workDate)}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{report.description}</td>
              </tr>
              <tr>
                <td>Images</td>
                <td>
                  <div className="reportThumbs">
                    <img
                      width="100%"
                      src={report.image?.image?.publicUrlTransformed}
                    />
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </ReportStyle>
      </>
    );
  else
    return (
      <ReportStyle>
        <div>
          <strong className="noReportType">Report has no type</strong>
        </div>
        <br />
        <div>
          <strong>Created:</strong> {dateHelper(report.createdAt)}
        </div>
        <br />
        <div>
          <strong>Description:</strong> {report.description}
        </div>
      </ReportStyle>
    );
}
