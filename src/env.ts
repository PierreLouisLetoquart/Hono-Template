import type { Config } from "./config";

/**
 * Type definitions for context variables
 * Variables are request-scoped and accessed via c.var (not c.env)
 * Use Variables for Node.js environments, use Bindings for Cloudflare Workers
 */
export type Variables = {
	config: Config;
};

/**
 * Environment type to be used with Hono app
 */
export type Env = {
	Variables: Variables;
};
