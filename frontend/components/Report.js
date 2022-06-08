import styled from "styled-components";
import ApproveReport from "./ApproveReport";

const ReportStyle = styled.div`
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

export default function Report({ report }) {
  return (
    <ReportStyle>
      <div>
        <span>
          <strong>
            {report.createdAt || "[no date]"} by{" "}
            {report.user?.name || "no name"}
          </strong>
        </span>
      </div>
      <div>{report.description}</div>
      <div className="reportThumbs">
        <img width="100%" src={report.image?.image.publicUrlTransformed} />
      </div>
    </ReportStyle>
  );
}
