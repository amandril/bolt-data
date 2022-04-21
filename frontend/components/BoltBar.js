import { ResponsiveBar } from "@nivo/bar";

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
    // legends={[
    //   {
    //     dataFrom: "keys",
    //     anchor: "top-right",
    //     direction: "column",
    //     itemWidth: 100,
    //     itemHeight: 20,
    //     itemDirection: "left-to-right",
    //     itemOpacity: 0.85,
    //     symbolSize: 20,
    //     effects: [
    //       {
    //         on: "hover",
    //         style: {
    //           itemOpacity: 1,
    //         },
    //       },
    //     ],
    //   },
    // ]}
  />
);

export default MyResponsiveBar;
