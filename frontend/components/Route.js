import styled from 'styled-components';


const RouteStyle = styled.div`
    position:relative;
    max-width:300px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap:10px;
    padding:10px;
    border: 2px solid rgba(20, 20, 20, 0.3);
`;

const BoltStyle = styled.div`
    background-color:rgba(10,10,10,0.1);
    padding:5px;
    display: grid;
    grid-template-columns:1fr 1fr;
`

export default function Route({route}) {
    console.log(route);
    return (
        <RouteStyle>
            <h2>{route.name}</h2>
            <span>{route.geolocation}</span>
            {route.bolts.map((bolt) => {
                return (
                <BoltStyle>
                    <div>Position: {bolt.position}</div>
                    <div>Condition: {bolt.condition}</div>
                </BoltStyle>
                )
            })}
        </RouteStyle>
    );
}