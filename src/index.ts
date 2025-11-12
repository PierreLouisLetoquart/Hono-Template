import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { validator } from "hono/validator";
import { z } from "zod";
import { factorial, sum } from "./calculator";
import config from "./config";
import type { Env } from "./env";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { logger } from "hono/logger";

const app = new Hono<Env>();

app.use(cors());
app.use(secureHeaders());
app.use(logger());

// Middleware to inject config into context
app.use("*", async (c, next) => {
	c.set("config", config);
	await next();
});

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

// Example endpoint demonstrating type-safe config access via context
app.get("/config", (c) => {
	// Access config through c.var with full type safety
	const { port } = c.var.config;

	return c.json({
		message: "Configuration accessed via context",
		port,
		environment: "development",
	});
});

const factorialSchema = z.object({
	number: z
		.string()
		.refine(
			(val) => {
				const num = parseInt(val, 10);
				return !Number.isNaN(num);
			},
			{
				message: "Invalid number parameter",
			},
		)
		.transform((val) => parseInt(val, 10)),
});

app.get(
	"/factorial/:number",
	validator("param", (value) => {
		const parsed = factorialSchema.safeParse(value);
		if (!parsed.success) {
			const errorMessage = z.prettifyError(parsed.error);
			throw new HTTPException(400, { message: errorMessage });
		}
		return parsed.data;
	}),
	(c) => {
		const { number } = c.req.valid("param");

		try {
			const result = factorial(number);
			return c.json({ number, factorial: result });
		} catch (error) {
			throw new HTTPException(400, { message: (error as Error).message });
		}
	},
);

const sumSchema = z.object({
	numbers: z.array(z.number()).min(1, "Array must contain at least one number"),
});

app.post(
	"/sum",
	validator("json", (value) => {
		const parsed = sumSchema.safeParse(value);
		if (!parsed.success) {
			const errorMessage = z.prettifyError(parsed.error);
			throw new HTTPException(400, { message: errorMessage });
		}
		return parsed.data;
	}),
	(c) => {
		const { numbers } = c.req.valid("json");
		const result = sum(numbers);
		return c.json({ numbers, sum: result });
	},
);

// Export app for use in tests and server
export default app;
