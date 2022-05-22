import "dotenv/config";
import { cloudinaryImage } from "@keystone-next/cloudinary";
import { relationship, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: "databolt",
};

export const ReportImage = list({
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: "Source",
    }),
    altText: text(),
    report: relationship({ ref: "Report.image" }),
  },
  ui: {
    listView: {
      initialColumns: ["report"],
    },
  },
});
