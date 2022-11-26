import styled from "styled-components";

const ReportButton = styled.button`
  background-color: ${(props) => {
    if (props.hardware) {
      return "#e48f2b";
    }
    if (props.work) {
      return "#428DFF";
    }
  }};
  border-radius: 5px;
  border: none;
  padding: 1rem;
  color: #ffffff;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
`;

export { ReportButton };
