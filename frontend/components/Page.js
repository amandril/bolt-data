import propTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Serif+Pro&display=swap');
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

  // Used for centering containers in the body
  .centering {
    margin: 0 auto;
    text-align:center;
  }

  h1.pageHeader{
    font-family: Arial, Helvetica, sans-serif;
    font-weight: normal;
    text-align: center;
    font-size: 4rem;
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
      grid-template-columns: 500px;
      grid-gap: 10px;
      margin: 2rem auto;
    }
    .addBoltRow {
      grid-column: 1;
      display: grid;
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
