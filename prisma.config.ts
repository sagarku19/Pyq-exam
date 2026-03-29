import { config } from "dotenv";
import { defineConfig } from "prisma/config";

config({ path: ".env.local" });
config({ path: ".env" }); // fallback

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Session pooler (port 5432) — works for both CLI and app runtime.
    // Direct IPv6 URL is not reachable from this network.
    url: process.env["DATABASE_URL"],
  },
});
