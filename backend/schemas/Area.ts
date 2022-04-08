import { text, integer, relationship } from "@keystone-next/fields";
import  {list} from "@keystone-next/keystone/schema";
import { Route } from "./Route";


export const Area = list({
    fields: {
        name: text({
            isRequired: true,
        }),
        usState: text(),
        geolocation: text(),
        // area: relationship({
        //     ref: 'area'
        // }),
        // bolt: relationship({
        //     ref: 'Bolt.route',
        //     many: true
        // }),
    }
});