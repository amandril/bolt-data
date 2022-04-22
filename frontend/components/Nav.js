import Link from "next/link";
import styled from "styled-components";

const NavStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: start;
  a {
    margin-right: 10px;
    text-decoration: none;
    color: #222222;
  }
`;

export default function Nav() {
  return (
    <NavStyles>
      <Link href="/about">About</Link>
      <Link href="http://openbeta.io">OpenBeta</Link>
    </NavStyles>
  );
}
