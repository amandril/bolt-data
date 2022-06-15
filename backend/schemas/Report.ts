import { text, relationship, timestamp, checkbox } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";

export const Report = list({
  fields: {
    climb: relationship({
      ref: "Climb.reports",
      ui: {
        displayMode: "select",
      },
    }),
    bolt: relationship({
      ref: "Bolt.reports",
      ui: {
        displayMode: "select",
      },
    }),
    image: relationship({
      ref: "ReportImage.report",
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: {
          fields: ["image", "altText"],
        },
        inlineEdit: {
          fields: ["image", "altText"],
        },
      },
    }),
    user: relationship({
      ref: "User.reports",
      ui: {
        displayMode: "select",
      },
    }),
    description: text(),
    approved: checkbox({
      defaultValue: false,
    }),
    createdAt: timestamp({
      defaultValue: `${Date.now()}`,
    }),
  },
  ui: {
    listView: {
      initialColumns: ["climb", "bolt", "description"],
    },
  },
});
