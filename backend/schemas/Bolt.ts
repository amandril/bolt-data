import { text, select, relationship, integer, timestamp } from "@keystone-next/fields";
import  {list} from "@keystone-next/keystone/schema";
import { DateTime } from "@keystonejs/fields";

export const Bolt = list({
  fields: {
    route: relationship({
        ref: "Route.bolts",
        ui: {
          displayMode: "select",
        },
      }),
    pitch: integer(),
    use: select({
      options: [
        { label: "Lead", value: "lead" },
        { label: "Anchor", value: "anchor" },
      ],
    }),
    position: integer(),
    type: select({
      options: [
        { label: "Bolt", value: "bolt" },
        { label: "Pin", value: "pin" },
        { label: "Webbing", value: "webbing" },
        { label: "Other", value: "other" },
      ],
    }),
    description: text(),
    condition: select({
      defaultValue: "unknown",
      options: [
        { label: "Unknown", value: "unknown" },
        { label: "Poor", value: "poor" },
        { label: "Average", value: "average" },
        { label: "Good", value: "good" },
        { label: "Bomber", value: "bomber" },
      ],
      ui: {
        displayMode: "segmented-control",
      },
    }),
    installDate: text({
      defaultValue: "YYYYMMDD",
    }),
    lastUpdated: text({
      defaultValue: "YYYYMMDD",
    }),
  },
  ui: {
    listView: {
      initialColumns: ["position", "type", "use", "route"],
    },
  },
});