// Work Report - from rebolters, work completed

import styled from "styled-components";

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

export default function WorkReport({ report, bolt }) {
  return (
    <ReportStyle>
      <p>This is a work report</p>
    </ReportStyle>
  );
}
