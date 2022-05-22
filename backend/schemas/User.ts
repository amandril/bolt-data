import { password, text, relationship } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";

export const User = list({
  // access:
  // ui
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    reports: relationship({
      ref: "Report.user",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["climb", "bolt", "user", "description", "timestamp"],
        inlineCreate: {
          fields: ["climb", "bolt", "user", "description", "timestamp"],
        },
        inlineEdit: {
          fields: ["climb", "bolt", "user", "description", "timestamp"],
        },
      },
    }),
    // TODO: add roles
  },
});
