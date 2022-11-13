import {
  text,
  integer,
  relationship,
  timestamp,
  checkbox,
  select,
} from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";

export const Report = list({
  fields: {
    climb: relationship({
      ref: "Climb.reports",
      ui: {
        displayMode: "select",
      },
    }),
    // Useful if a report was created on a specific bolt - still shows up for climb queries
    bolt: relationship({
      ref: "Bolt.reports",
      ui: {
        displayMode: "select",
      },
    }),
    // Whether it came from a climber or from a rebolter/LCO
    typeOfReport: select({
      options: [
        { label: "Bad Hardware Report", value: "hardware" },
        { label: "Rebolt Tracking", value: "work" },
      ],
    }),

    // Only for climber reports
    name: text(),
    email: text(),
    reportedHardware: select({
      options: [
        { label: "Wedge bolt", value: "wedge" },
        { label: "5 piece bolt", value: "fivepiece" },
        { label: "Button head bolt", value: "buttonhead" },
        { label: "Glue in bolt", value: "gluein" },
        { label: "Other", value: "other" },
        { label: "I don't know", value: "unknown" },
      ],
    }),
    where: text(),
    problem: select({
      options: [
        { label: "Rusty", value: "rusty" },
        { label: "Spinning hanger", value: "spinner" },
        { label: "Excessive wear", value: "worn" },
        { label: "Missing (partially or fully)", value: "missing" },
        { label: "Old or improper hardware", value: "improper" },
        { label: "Other", value: "other" },
      ],
    }),
    approved: checkbox({
      defaultValue: false,
    }),

    // Rebolter form only
    user: relationship({
      ref: "User.reports",
      ui: {
        displayMode: "select",
      },
    }),
    workDate: text({
      defaultValue: `${JSON.stringify(Date.now())}`,
    }),
    numReplaced: integer(),
    typeOfBolts: select({
      options: [
        { label: "Mechanical", value: "mechanical" },
        { label: "Glue in", value: "gluein" },
      ],
    }),
    hooksInstalled: integer(),
    volunteerHours: text(),
    otherVolunteers: text(),

    // Used for both report types
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
    description: text(), // Used for extra notes
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
