import styled from "styled-components";
import { useRef, useEffect } from "react";

const HardwareBarStyle = styled.div`
  position: relative;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  .section {
    display: inline-block;
    text-align: center;
    font-weight: bold;
    font-size: 0.8rem;
    line-height: 2rem;
    color: rgba(0, 0, 0, 0.5);
  }
  /* .unknown {
    background-color: var(--unknownColor);
  } */
`;

export default function HardwareBar({
  climb,
  poorBolts,
  averageBolts,
  goodBolts,
  bomberBolts,
  unknownBolts,
  _boltsMeta,
}) {
  const barFullNode = useRef(null),
    unknownNode = useRef(null),
    poorNode = useRef(null),
    averageNode = useRef(null),
    goodNode = useRef(null),
    bomberNode = useRef(null);

  useEffect(() => {
    const barFull = barFullNode.current,
      unknown = unknownNode.current,
      poor = poorNode.current,
      average = averageNode.current,
      good = goodNode.current,
      bomber = bomberNode.current;

    poor.style.width =
      (poorBolts.count / _boltsMeta.count) * barFull.clientWidth + "px";
    average.style.width =
      (averageBolts.count / _boltsMeta.count) * barFull.clientWidth + "px";
    good.style.width =
      (goodBolts.count / _boltsMeta.count) * barFull.clientWidth + "px";
    bomber.style.width =
      (bomberBolts.count / _boltsMeta.count) * barFull.clientWidth + "px";
    unknown.style.width =
      (unknownBolts.count / _boltsMeta.count) * barFull.clientWidth + "px";
  });

  //   console.log("Climb bolts meta ", climb._boltsMeta.count, " for ", climb.name);
  return (
    <HardwareBarStyle ref={barFullNode}>
      <span ref={unknownNode} className="section unknown">
        {unknownBolts.count > 0 ? unknownBolts.count + " unknown" : ""}
      </span>
      <span ref={poorNode} className="section poor">
        {poorBolts.count > 0 ? poorBolts.count + " poor" : ""}
      </span>
      <span ref={averageNode} className="section average">
        {averageBolts.count > 0 ? averageBolts.count + " average" : ""}
      </span>
      <span ref={goodNode} className="section good">
        {goodBolts.count > 0 ? goodBolts.count + " good" : ""}
      </span>
      <span ref={bomberNode} className="section bomber">
        {bomberBolts.count > 0 ? bomberBolts.count + " bomber" : ""}
      </span>
    </HardwareBarStyle>
  );
}
