import Link from "next/link";
import styled from "styled-components";

const NavStyles = styled.div`
  a {
    margin-right: 10px;
  }
`;

export default function Nav() {
  return (
    <NavStyles>
      <Link href="/areas">Areas</Link>
      <Link href="/hardware">Hardware</Link>
    </NavStyles>
  );
}
