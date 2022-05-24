import {
  text,
  select,
  relationship,
  integer,
  timestamp,
  virtual,
} from "@keystone-next/fields";
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
    installDate: text(),
    lastUpdated: text(),
  },
  ui: {
    listView: {
      initialColumns: ["position", "type", "use", "climb", "installDate"],
    },
  },
});
