import { serve } from "@hono/node-server";
// import { createServer } from "node:http2";
import app from "./index";
import config from "./config";

// Start server with HTTP/2 support
const server = serve(
	{
		fetch: app.fetch,
		port: config.port,
		// createServer, // Enable HTTP/2
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
		// console.log("HTTP/2 enabled");
	},
);

// Graceful shutdown
const shutdown = () => {
	console.log("\nShutting down server...");
	server.close(() => {
		console.log("Server closed");
		process.exit(0);
	});
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
