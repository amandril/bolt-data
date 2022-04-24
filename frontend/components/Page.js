import propTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";

const GlobalStyles = createGlobalStyle`
html {
    --max-width: 1000px;
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
    font-size: 1.5rem;
    line-height: 2;
}
a {
    text-decoration: none;
}
  // Bolt card styles
  .poor.poor {
      background-color: var(---poorColor);
  }
  .average.average {
      background-color: var(---averageColor);
  }
  .good.good {
    background-color: var(---goodColor);
  }
  .bomber.bomber {
    background-color: var(---bomberColor);
  }
  .unknown.unknown {
    background-color: var(---unknownColor);
  }
`;

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
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
