import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default defineConfig({
  name: "upravuchet-blog",
  title: "УправУчет Blog",

  projectId: projectId || "",
  dataset: dataset || "",
  useCdn: false,
  apiVersion: "2024-12-01",

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
