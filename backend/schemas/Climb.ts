import { text, relationship, select } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";

export const Climb = list({
  fields: {
    openbetaClimbId: text({
      isRequired: true,
    }),
    name: text({
      isRequired: true,
    }),
    fa: text(),
    reports: relationship({
      ref: "Report.climb",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["description", "image", "createdAt"],
        inlineCreate: {
          fields: ["description", "image", "createdAt"],
        },
        inlineEdit: {
          fields: ["description", "image", "createdAt"],
        },
      },
    }),
    status: select({
      defaultValue: "idle",
      options: [
        { label: "Done / Idle", value: "idle" },
        { label: "Assess Further", value: "assess" },
        { label: "Requires Work", value: "requiresWork" },
        { label: "Work in Progress", value: "inProgress" },
      ],
    }),
    bolts: relationship({
      ref: "Bolt.climb",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: [
          "position",
          "type",
          "use",
          // "description",
          "condition",
          "installDate",
          "lastUpdated",
        ],
        inlineCreate: {
          fields: [
            "position",
            "type",
            "use",
            // "description",
            "condition",
            "installDate",
            "lastUpdated",
          ],
        },
        inlineEdit: {
          fields: [
            "position",
            "type",
            "use",
            // "description",
            "condition",
            "installDate",
            "lastUpdated",
          ],
        },
      },
    }),
  },
  ui: {
    listView: {
      initialColumns: ["name", "bolts"],
    },
  },
});
