import { z } from "zod";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const configSchema = z.object({
	port: z.number().min(1000).max(65535),
});

const configPath = join(process.cwd(), "config.json");
const configFile = JSON.parse(readFileSync(configPath, "utf-8"));

const config = configSchema.parse(configFile);

export default config;

export type Config = z.infer<typeof configSchema>;
