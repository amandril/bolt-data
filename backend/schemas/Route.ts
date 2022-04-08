import { text, integer, relationship } from "@keystone-next/fields";
import  {list} from "@keystone-next/keystone/schema";
import { Area } from "./Area";


export const Route = list({
    fields: {
        name: text({
            isRequired: true,
        }),
        geolocation: text(),
        parent_sector: text(),
        bolts: relationship({
            ref: 'Bolt.route',
            many: true,
            ui: {
                displayMode: 'cards',
                cardFields: ['position', 'type', 'use', 'description', 'condition','installDate','lastUpdated'],
                inlineCreate: { fields: ['position', 'type', 'use', 'description', 'condition','installDate','lastUpdated']},
                inlineEdit: { fields: ['position', 'type', 'use', 'description', 'condition','installDate','lastUpdated']},
            },
        }),
        mp_route_id: text(),
        mp_sector_id: text(),
        // area: relationship({
        //     ref: 'area'
        // }),
        // bolt: relationship({
        //     ref: 'Bolt.route',
        //     many: true
        // }),
    },
    ui: {
        listView: {
            initialColumns: ['name', 'parent_sector', 'geolocation', 'bolts'],
        }
    },
});