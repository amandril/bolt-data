import { text, integer, relationship, virtual } from "@keystone-next/fields";
import  {list} from "@keystone-next/keystone/schema";
import { Area } from "./Area";


export const Route = list({
    fields: {
        route_name: text({
            isRequired: true,
        }),
        lnglat: virtual({
            graphQLReturnType: 'String',
            resolver(route) {
                return route.lnglat
            }
        }),
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
            initialColumns: ['route_name', 'bolts'],
        }
    },
});