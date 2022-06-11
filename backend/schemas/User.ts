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
        cardFields: ["climb", "bolt", "user", "description", "createdAt"],
        inlineCreate: {
          fields: ["climb", "bolt", "user", "description", "createdAt"],
        },
        inlineEdit: {
          fields: ["climb", "bolt", "user", "description", "createdAt"],
        },
      },
    }),
    // TODO: add roles
  },
});
