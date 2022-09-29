import { thumbClimbs } from "./firstData";

export async function insertSeedData(ks: any) {
  // Check for both version to get keystone
  const keystone = ks.keystone || ks;
  const adapter = keystone.adapters?.MongooseAdapter || keystone.adapter;

  // TODO: Get climbs from the OpenBeta api and insert them into the Bolt-Data database

  // fetch a climb from OpenBeta
  async function seedClimbs() {
    console.log("1 - START");

    const response = await fetch("https://api.openbeta.io", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query getClimbsFromOpenBeta {
            areas(filter: {area_name: {match: "Left Hand Rock"}}) {
              areaName
              totalClimbs
              climbs {
                uuid
                name
                fa
              }
            }
          }
        `,
      }),
    });

    console.log("2 - After fetch");

    // Not working, why?
    // if (!response.ok) {
    //   const message = `An error has occurred: ${response.status}`;
    //   throw new Error(message);
    // }

    // This works fine
    if (response.ok) {
      console.log("Yes, it's working");
    }

    const area = await response.json();
    const climbs = area.data.areas.map((area) =>
      area.climbs.map((climb) => climb)
    );

    console.log("3 - END");
    return climbs.flat();
  }

  console.log("Before the function calls");

  const { mongoose } = adapter;

  const climbs = await seedClimbs();

  console.log(climbs);
  for (const climb of climbs) {
    console.log("Inserting climb ", climb);
    await mongoose.model("Climb").create({
      name: climb.name,
      fa: climb.fa,
      openbetaClimbId: climb.uuid,
    });
  }

  // await seedClimbs().then((climbs) =>
  //   console.log(
  //     climbs.data.areas.map(
  //       async (area) =>
  //         await area.children.map(async (child) => {
  //           const { mongoose } = adapter;
  //           await child.climbs.map(async (climb) => {
  //             console.log("Inserting climb ", climb.name);
  //             await mongoose.model("Climb").create({
  //               name: climb.name,
  //               fa: climb.fa,
  //               openbetaClimbId: climb.uuid,
  //             });
  //             climb.name;
  //           });
  //         })
  //     )
  //   )
  // );

  // await seedClimbs()
  //   .then(async (climbs) => {
  //     console.log("Inserting climbs ---------------------------------");
  //     for (const area of climbs.data.area) {
  //       for (const child of area) {
  //         // Log the climb we're adding
  //         console.log(child.areaName);
  //         for (const climb of child) {
  //           console.log("Inserting ", climb.name, " - ", climb.uuid);
  //           await mongoose.model("Climb").create({
  //             name: climb.name,
  //             fa: climb.fa,
  //             openbetaClimbId: climb.uuid,
  //           });
  //         }
  //       }
  //     }
  //   })
  //   .catch((error) => error);

  // insert into Bolt-Data
  // Check if it already exists
  // If yes, do nothing
  // If not, use mongoose to insert name, fa, id, etc

  /////// ROUTES
  // console.log("Inserting climbs:");
  // const { mongoose } = adapter;
  // for (const climb of thumbClimbs) {
  //   console.log(`Adding Climb: ${climb.name}`);
  //   await mongoose.model("Climb").create({
  //     name: climb.name,
  //     fa: climb.fa,
  //     openbetaClimbId: climb.id,
  //   });
  // }
  // console.log(
  //   `Climbs inserted: ${thumbClimbs.length} climbs${
  //     thumbClimbs.length > 1 ? "s" : ""
  //   }`
  // );

  /////// AREAS
  // console.log(`Inserting areas: ${areas.length} area${areas.length>1?'s':''}`);
  // const { mongoose } = adapter;
  // for (const area of areas) {
  //     console.log(`Adding Area: ${area.area_name}`);
  //     await mongoose.model('Area').create({name: area.area_name, usState: area.us_state, geolocation: area.lnglat.toString()});
  // }
  // console.log(`Areas inserted: ${areas.length} area${areas.length>1?'s':''}`);

  // console.log("Restart the process with 'npm run dev'");
  console.log("This is the end of the script -------------------------------");
  process.exit();
}
