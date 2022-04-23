import { ResponsiveBar } from "@nivo/bar";

const MyResponsiveBar = ({ data, key }) => (
  <ResponsiveBar
    data={data}
    keys={key}
    indexBy={key}
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    // colors={{ datum: "data.color" }}
    colors={{ scheme: "nivo" }}
    colorBy="indexValue"
    motionConfig={{
      mass: 1,
      friction: 26,
      tension: 110,
    }}
    borderColor={{ from: "color" }}
    // borderWidth="10"
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Bolt Conditions",
      legendPosition: "middle",
      legendOffset: 40,
    }}
    axisLeft={false}
    enableGridY={false}
  />
);

export default MyResponsiveBar;
