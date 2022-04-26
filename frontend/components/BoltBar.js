import { ResponsiveBar } from "@nivo/bar";

// const colors = {
//   poorBolts: --poorColor,
//   averageBolts: --averageColor,
//   goodBolts: --goodColor,
//   bomberBolts: --bomberColor,
//   unknownBolts: unknownColor",
// };
const colors = {
  poorBolts: "var(--poorColor)",
  averageBolts: "var(--averageColor)",
  goodBolts: "var(--goodColor)",
  bomberBolts: "var(--bomberColor)",
  unknownBolts: "var(--unknownColor)",
};
const getColor = (bar) => colors[bar.data.id];

const MyResponsiveBar = ({ data }) => (
  <ResponsiveBar
    data={data}
    keys={data.id}
    indexBy={data.id}
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={getColor}
    colorBy="indexValue"
    motionConfig={{
      mass: 1,
      friction: 26,
      tension: 110,
    }}
    borderColor={{ from: "color" }}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Fixed Hardware",
      legendPosition: "middle",
      legendOffset: 40,
    }}
    axisLeft={false}
    enableGridY={false}
  />
);

export default MyResponsiveBar;
