import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2022-03-07",
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  useCdn: false,
});

export default client;
