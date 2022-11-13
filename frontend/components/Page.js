import propTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";

const GlobalStyles = createGlobalStyle`
  html {
      --maxWidth: 1200px;
      margin: 0 auto;
      color:#222222;
      -bs:0 12px 24px 0 rgba(0,0,0,0.09);
      box-sizing: border-box;
      // Bold condition colors
      --poorColor: #ed8b76;
      --averageColor: #ffe68e;
      --goodColor: #a7ecba;
      --bomberColor: #93bcfa;
      --unknownColor: #FFDEB7;
  }
  *, *:before, *:after {
      box-sizing:inherit;
  } 
  body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      padding: 0;
      margin: 0;
      font-size: 1rem;
      line-height: 2;
  }
  section.main {
    max-width:800px;
    margin: 0 auto;
  }
  a {
      text-decoration: none;
      color:initial;
  }
  p {
    line-height: 2.2rem;
  }
  // Bolt card styles
  .poor.poor {
      background-color: var(--poorColor);
  }
  .average.average {
      background-color: var(--averageColor);
  }
  .good.good {
    background-color: var(--goodColor);
  }
  .bomber.bomber {
    background-color: var(--bomberColor);
  }
  .unknown.unknown {
    background-color: var(--unknownColor);
  }

  // Bolt statuses
  .status-idle {
    background-color: #93bcfa;
  }
  .status-assess {
    background-color: #ffe68e;
  }
  .status-requiresWork {
    background-color: red;
  }
  .status-inProgress {
    background-color: lightgreen;
  }

  // Used for centering containers in the body
  .centering {
    margin: 0 auto;
    text-align:center;
  }

  h1.pageHeader{
    font-family: Roboto;
    font-weight: normal;
    text-align: center;
    font-size: 3rem;
    line-height: 5rem;
  }
  .boltSection {
    margin: 0;
    background-color: #eeeeee;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    padding:2rem;
    .boltCards {
      display: grid;
      /* grid-template-columns: 600px; */
      grid-gap: 15px;
      margin: 2rem auto;
    }
    .hardwareBar {
      background-color: #ffffff;
      padding: 1rem;
      border-radius:5px;
    }
  }
  
  .boltConditionBar {
    font-weight: bold;
    display: grid;
    align-items: center;
    font-size: .8rem;
    background-color: lightgray;
    color: rgba(0, 0, 0, 0.5);
    height: 2rem;
    margin: 1rem;
    text-align: center;
    border-radius: 10px;
  }
  .cardLabel {
    font-size: 0.8rem;
    color: #cdcdcd;
    line-height: 0.5rem;
  }
  /* Forms */
  label {
      color: #222222;
      font-size: .9rem;
      display: grid;
      grid-gap: 0.5rem;
      grid-template-columns: 1fr;
      justify-content: start;
      width: 100%;
      input {
        height: 2rem;
      }
      input,
      textarea,
      select {
        display: block;
        padding: 1.5rem 1rem;
        /* margin: 1rem; */
        border-radius: 10px;
        font-size: 1rem;
        border: 2px solid #dddddd;
      }
      textarea {
        height: 15rem;
        resize: none;
      }
    }
`;

const InnerStyles = styled.div`
  /* max-width: var(--maxWidth); */
  margin: 0 auto;
  /* padding: 2rem; */
`;

export default function Page({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
}

Page.propTypes = {
  children: propTypes.any,
};
