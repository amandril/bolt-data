import { thumbClimbs } from "./firstData";

export async function insertSeedData(ks: any) {
  // Check for both version to get keystone
  const keystone = ks.keystone || ks;
  const adapter = keystone.adapters?.MongooseAdapter || keystone.adapter;

  ///////// ROUTES
  console.log(`Inserting climbs: ${thumbClimbs.length} climbs`);
  const { mongoose } = adapter;
  for (const climb of thumbClimbs) {
    console.log(`Adding Climb: ${climb.name}`);
    await mongoose.model("Climb").create({
      name: climb.name,
      fa: climb.fa,
      openbetaClimbId: climb.id,
    });
  }
  console.log(
    `Climbs inserted: ${thumbClimbs.length} climbs${
      thumbClimbs.length > 1 ? "s" : ""
    }`
  );

  /////// AREAS
  // console.log(`Inserting areas: ${areas.length} area${areas.length>1?'s':''}`);
  // const { mongoose } = adapter;
  // for (const area of areas) {
  //     console.log(`Adding Area: ${area.area_name}`);
  //     await mongoose.model('Area').create({name: area.area_name, usState: area.us_state, geolocation: area.lnglat.toString()});
  // }
  // console.log(`Areas inserted: ${areas.length} area${areas.length>1?'s':''}`);

  console.log("Restart the process with 'npm run dev'");
  process.exit();
}
