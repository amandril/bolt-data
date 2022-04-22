import { ResponsiveBar } from "@nivo/bar";

<<<<<<< HEAD
const MyResponsiveBar = ({ data, keys }) => (
  <ResponsiveBar
    data={data}
    keys={keys}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
=======
// What the data should look like
// [
//  { color: "#ff0000", id: "poorBolts", label: "Poor", count: 12 },
//  { color: "#ff0000", id: "averageBolts", label: "Average", count: 12 },
//  { color: "#ff0000", id: "goodBolts", label: "Good", count: 12 },
//  { color: "#ff0000", id: "bomberBolts", label: "Bomber", count: 12 },
//  { color: "#ff0000", id: "unknownBolts", label: "Unknown", count: 12 }
// ]

// {"poorBolts": {count: 4}}

// export const boltData = (data) => {
//   const boltDataObject = data.reduce((bolts, boltType) => {
//     const boltCountObject = data.boltType.count.reduce(
//       (boltCount, currentBoltCount) => {
//         console.log(currentBoltCount);
//       },
//       bolts
//     );
//   }, {});
//   return [];
// };

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
    borderWidth="10"
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Bolt Conditions",
      legendPosition: "middle",
      legendOffset: 40,
    }}
>>>>>>> 9bdc6bb996514262ece4191093b2312661f1df40
  />
);

export default MyResponsiveBar;
