export async function insertSeedData(ks: any) {
  // Check for both version to get keystone
  const keystone = ks.keystone || ks;
  const adapter = keystone.adapters?.MongooseAdapter || keystone.adapter;

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
                uuid
                fa
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
        console.log("Queried climb - ", climb.name);
        agg.push(climb);
      }
    }

    return agg.flat();
  }

  const { mongoose } = adapter;

  // Calls the query function and stores into variable

  const areaClimbs = await queryClimbs("e519a674-a620-509c-9e86-a246f84a8e40");

  // Let's check if the climbs here are already in the database

  console.log("--------------------------------------------------------");
  console.log("--------------------------------------------------------");
  console.log("--------------------------------------------------------");
  console.log("--------- Checking for matches in the database ---------");
  console.log("--------------------------------------------------------");
  console.log("--------------------------------------------------------");
  console.log("--------------------------------------------------------");

  // 1. Loop over each of the climbs from the queryClimbs function

  for (const climb of areaClimbs) {
    // 2. Run a new query on the bolt-data database using the uuid from each climb
    await mongoose
      .model("Climb")
      .findOne(
        { openbetaClimbId: climb.uuid },
        async function (err, foundClimb) {
          // 3. Check if it returns anything
          if (foundClimb) {
            // 3.1 If so, display a match and do nothing
            console.log("Found climb: ", foundClimb.name);
          } else {
            // 3.2 If not, add the climb to the database
            console.log(`No match - adding ${climb.name} to Bolt-Data`);
            await mongoose.model("Climb").create({
              name: climb.name,
              fa: climb.fa,
              openbetaClimbId: climb.uuid,
            });
          }
        }
      );
  }

  process.exit();
}
