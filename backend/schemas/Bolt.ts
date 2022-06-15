import { text, select, relationship, integer } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";

export const Bolt = list({
  fields: {
    climb: relationship({
      ref: "Climb.bolts",
      ui: {
        displayMode: "select",
      },
    }),
    reports: relationship({
      ref: "Report.bolt",
      many: true,
      // ui: {
      //   displayMode: "cards",
      //   cardFields: ["user", "image", "description", "createdAt"],
      //   inlineCreate: {
      //     fields: ["user", "image", "description", "createdAt"],
      //   },
      //   inlineEdit: {
      //     fields: ["user", "image", "description", "createdAt"],
      //   },
      // },
    }),
    pitch: integer(),
    use: select({
      options: [
        { label: "Lead", value: "lead" },
        { label: "Anchor", value: "anchor" },
        { label: "Belay", value: "belay" },
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
    // description: text(),
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
      defaultValue: "1/1/1890",
    }),
    lastUpdated: text(),
  },
  ui: {
    listView: {
      initialColumns: [
        "position",
        "type",
        "use",
        "climb",
        "reports",
        "installDate",
        "lastUpdated",
      ],
    },
  },
});
