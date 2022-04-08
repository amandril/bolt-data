import { routes } from "./firstData";
import { areas } from "./firstAreas";

export async function insertSeedData(ks: any) {
    // Check for both version to get keystone
    const keystone = ks.keystone || ks;
    const adapter = keystone.adapters?.MongooseAdapter || keystone.adapter;

    ///////// ROUTES
    console.log(`Inserting routes: ${routes.length} routes`);
    const { mongoose } = adapter;
    for (const route of routes) {
        console.log(`Adding Route: ${route.route_name}`);
        await mongoose.model('Route').create({name: route.route_name, parent_sector: route.metadata.parent_sector, geolocation: route.metadata.parent_lnglat.toString()});
    }
    console.log(`Routes inserted: ${routes.length} route${routes.length>1?'s':''}`);

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