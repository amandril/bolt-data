import styled from "styled-components";
import Bolt from "./Bolt";

const RouteStyle = styled.div`
  position: relative;
  max-width: 300px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  padding: 10px;
  border: 5px solid rgba(20, 20, 20, 0.3);
  h2 {
    background-color: peachpuff;
  }
`;

export default function Route({ route }) {
  return (
    <RouteStyle>
      <h2>{route.route_name}</h2>
      <span>{route.lnglat}</span>
      {route.bolts ? (
        route.bolts.map((bolt) => {
          return <Bolt key={bolt.id} bolt={bolt} />;
        })
      ) : (
        <div>No bolts</div>
      )}
    </RouteStyle>
  );
}
