import {DB_URL} from "./src/envs/index.js";

export default {
  mongodb: {
    url: DB_URL,
  },

  migrationsDir: "src/migrations",
  changelogCollectionName: "changelog",
  moduleSystem: "esm",
};