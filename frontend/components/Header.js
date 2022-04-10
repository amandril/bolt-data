import Link from "next/link";
import styled from "styled-components";
import Nav from "./Nav";
import Search from "./Search";

const Logo = styled.h1`
  background: peachpuff;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  a {
    color: #222222;
    text-decoration: none;
  }
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  padding: 1rem;
  text-transform: uppercase;
  display: inline-block;
`;

const HeaderStyles = styled.header`
  .logo {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: center;
    border-bottom: 10px solid var(--black, #222222);
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black, #222222);
  }
`;

export default function Header() {
  return (
    <HeaderStyles>
      <div className="logo">
        <Logo>
          <Link href="/">Data-Bolt</Link>
        </Logo>
      </div>
      <div className="sub-bar">
        <Search />
      </div>
      <Nav />
    </HeaderStyles>
  );
}
