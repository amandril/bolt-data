import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import Nav from "./Nav";
import Search from "./Search";

const Logo = styled.h1`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  a {
    color: #222222;
    text-decoration: none;
  }
  margin-left: 2rem;
  margin-bottom: 0;
  position: relative;
  z-index: 2;
  padding: 1rem;
`;

const HeaderStyles = styled.header`
  .top-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    justify-content: space-between;
    align-items: center;
    margin: 0 3rem;
    border-bottom: 10px solid var(--black, #222222);
  }
  .search {
    display: grid;
    grid-template-columns: 2fr 3fr;
    grid-gap: 60px;
  }
`;

function ClientOnly({ children, ...delegated }) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return <div {...delegated}>{children}</div>;
}
// then wrap Search

{
  /* <ClientOnly>
  <Search />
</ClientOnly>; */
}

export default function Header() {
  return (
    <HeaderStyles>
      <div className="top-bar">
        <Logo>
          <Link href="/">
            <img src="/data-bolt.png" height={120} />
          </Link>
        </Logo>
        <div className="search">
          <Nav />
          <ClientOnly>
            <Search />
          </ClientOnly>
        </div>
      </div>
    </HeaderStyles>
  );
}
