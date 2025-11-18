import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  PORT: z.string().default("4000"),
  MONGO_URI: z.string().url(),
  JWT_SECRET: z.string().min(20),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(" Invalid or missing ENV variables:");
  const errors = parsed.error.flatten().fieldErrors;
  console.error(JSON.stringify(errors, null, 2));
  console.error("Please create a .env file with the following variables:");
  console.error("PORT=4000");
  console.error("MONGO_URI=mongodb://localhost:27017/screens-playlists");
  console.error(
    "JWT_SECRET=your-super-secret-jwt-key-minimum-20-characters-long"
  );
  process.exit(1);
}

export const ENV = parsed.data;
