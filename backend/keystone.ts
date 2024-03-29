import { createAuth } from "@keystone-next/auth";
import { config, createSchema } from "@keystone-next/keystone/schema";
import {
  withItemData,
  statelessSessions,
} from "@keystone-next/keystone/session";
import "dotenv/config";
import { User } from "./schemas/User";
import { insertSeedData } from "./seed-data";
import { Climb } from "./schemas/Climb";
import { Bolt } from "./schemas/Bolt";
import { Report } from "./schemas/Report";
import { ReportImage } from "./schemas/ReportImage";

const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost/data-bolt-upandrunning";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
  secret: process.env.COOKIE_SECRET,
};

// const { withAuth } = createAuth({
//   listKey: 'User',
//   identityField: 'email',
//   secretField: 'password',
//   initFirstItem: {
//     fields: ['name', 'email', 'password'],
//     // TODO: Add in inital roles here
//   },
// });

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
    // TODO: Add initial roles
  },
});

export default withAuth(
  config({
    // @ts-ignore
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: "mongoose",
      url: databaseURL,
      async onConnect(keystone) {
        console.log("Connected to the database!");
        if (process.argv.includes("--seed-data")) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      // Schema items go in here
      User,
      Climb,
      Bolt,
      Report,
      ReportImage,
    }),
    ui: {
      // Show the UI only for poeple who pass this test
      isAccessAllowed: ({ session }) => {
        return !!session?.data;
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL query
      User: `id name email`,
    }),

    // session: withItemData(statelessSessions(sessionConfig), {
    //   // GraphQL Query
    //   User: `id name email role { ${permissionsList.join(' ')} }`,
    // }),
  })
);
