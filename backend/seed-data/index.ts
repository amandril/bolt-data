import { thumbClimbs } from "./firstData";

export async function insertSeedData(ks: any) {
  // Check for both version to get keystone
  const keystone = ks.keystone || ks;
  const adapter = keystone.adapters?.MongooseAdapter || keystone.adapter;

  // TODO: Get climbs from the OpenBeta api and insert them into the Bolt-Data database

  // fetch a climb from OpenBeta
  // async function seedClimbs() {
  //   console.log("1 - START");

  //   const response = await fetch("https://api.openbeta.io", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       query: `
  //         query getClimbsFromOpenBeta {
  //           area(uuid:"cd674f3c-8205-5aea-b926-ef2c3b804ed5") {
  //             totalClimbs
  //             areaName
  //             children {
  //               areaName
  //               uuid
  //               climbs {
  //                 name
  //               }
  //             }
  //           }
  //         }
  //       `,
  //     }),
  //   });

  //   console.log("2 - After fetch");

  //   // Not working, why?
  //   // if (!response.ok) {
  //   //   const message = `An error has occurred: ${response.status}`;
  //   //   throw new Error(message);
  //   // }

  //   // This works fine
  //   if (response.ok) {
  //     console.log("Yes, it's working");
  //   }

  //   const area = await response.json();
  //   // console.log(area);
  //   // const climbs = area.data?.area?.children?.map((area) =>
  //   //   area.climbs.map((climb) => climb)
  //   // );
  //   const children = area.data?.area?.children?.map((child) => child);

  //   console.log("3 - END");
  //   return area.data.area;
  // }

  // FETCH FUNCTION FOR QUERYING THE CLIMBS
  async function queryClimbs(uuid) {
    const response = await fetch("https://api.openbeta.io", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query getClimbsFromOpenBeta {
            area(uuid:"${uuid}") {
              uuid
              areaName
              totalClimbs
              climbs {
                name
              }
              children {
                areaName
                uuid
              }
            }
          }
        `,
      }),
    });

    let area = await response.json();
    let agg: any = [];

    if (area.data.area.climbs == false) {
      for (const a of area.data.area.children) {
        const climbs = await queryClimbs(a.uuid);
        agg.push(climbs);
      }
    } else {
      for (const climb of area.data.area.climbs) {
        agg.push(climb);
      }
    }

    return agg.flat();
  }

  console.log("Before the function calls");

  const { mongoose } = adapter;

  // Calls the function and stores into variable
  // const area = await seedClimbs();

  const areaClimbs = await queryClimbs("999af1f6-9a89-5316-b680-01294e8764bb");

  console.log(areaClimbs);

  // if (!area.climbs) {
  //   console.log(
  //     `${area.areaName} with ${area.children.length} areas, ${area.totalClimbs} total climbs, has no direct climbs`
  //   );
  //   for (const subarea of area.children) {
  //     const data = await queryMoreClimbs(subarea.uuid);
  //     console.log("Sub-area: ", data.areaName, " and climbs");
  //     for (const climb of data.climbs) {
  //       console.log("<> ", climb);
  //     }
  //   }
  // }

  // else {
  //   for (const child of children) {
  //     if (child.climbs) {
  //       console.log(child, " has climbs");
  //     }
  //   }
  // }

  // console.log(climbs);

  // for (const climb of climbs) {
  //   console.log(`${climb.name} - ${climb.uuid}`);
  // }

  // ----- Actually adding the climbs to the database -------- //
  // for (const climb of climbs) {
  //   console.log("Inserting climb ", climb);
  //   await mongoose.model("Climb").create({
  //     name: climb.name,
  //     fa: climb.fa,
  //     openbetaClimbId: climb.uuid,
  //   });
  // }

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
