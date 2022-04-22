import { text, integer, relationship, virtual } from "@keystone-next/fields";
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
    bolts: relationship({
      ref: "Bolt.climb",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: [
          "position",
          "type",
          "use",
          "description",
          "condition",
          "installDate",
          "lastUpdated",
        ],
        inlineCreate: {
          fields: [
            "position",
            "type",
            "use",
            "description",
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
            "description",
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
