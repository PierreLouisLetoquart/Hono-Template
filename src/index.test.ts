import { describe, test, expect } from "vitest";
import app from "./index";

describe("GET /", () => {
	test('should return "Hello Hono!"', async () => {
		const res = await app.request("/");
		expect(res.status).toBe(200);
		expect(await res.text()).toBe("Hello Hono!");
	});
});

describe("GET /factorial/:number", () => {
	test("should calculate factorial of 5", async () => {
		const res = await app.request("/factorial/5");
		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ number: 5, factorial: 120 });
	});

	test("should calculate factorial of 0", async () => {
		const res = await app.request("/factorial/0");
		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ number: 0, factorial: 1 });
	});

	test("should calculate factorial of 10", async () => {
		const res = await app.request("/factorial/10");
		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ number: 10, factorial: 3628800 });
	});

	test("should return 400 for invalid number", async () => {
		const res = await app.request("/factorial/abc");
		expect(res.status).toBe(400);
	});

	test("should return 400 for negative number", async () => {
		const res = await app.request("/factorial/-5");
		expect(res.status).toBe(400);
	});
});

describe("POST /sum", () => {
	test("should calculate sum of numbers", async () => {
		const res = await app.request("/sum", {
			method: "POST",
			body: JSON.stringify({ numbers: [1, 2, 3, 4, 5] }),
			headers: new Headers({ "Content-Type": "application/json" }),
		});
		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ numbers: [1, 2, 3, 4, 5], sum: 15 });
	});

	test("should handle negative numbers", async () => {
		const res = await app.request("/sum", {
			method: "POST",
			body: JSON.stringify({ numbers: [-1, -2, -3] }),
			headers: new Headers({ "Content-Type": "application/json" }),
		});
		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ numbers: [-1, -2, -3], sum: -6 });
	});

	test("should handle decimal numbers", async () => {
		const res = await app.request("/sum", {
			method: "POST",
			body: JSON.stringify({ numbers: [1.5, 2.5, 3.5] }),
			headers: new Headers({ "Content-Type": "application/json" }),
		});
		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ numbers: [1.5, 2.5, 3.5], sum: 7.5 });
	});

	test("should return 400 for empty array", async () => {
		const res = await app.request("/sum", {
			method: "POST",
			body: JSON.stringify({ numbers: [] }),
			headers: new Headers({ "Content-Type": "application/json" }),
		});
		expect(res.status).toBe(400);
	});

	test("should return 400 for missing numbers array", async () => {
		const res = await app.request("/sum", {
			method: "POST",
			body: JSON.stringify({}),
			headers: new Headers({ "Content-Type": "application/json" }),
		});
		expect(res.status).toBe(400);
	});

	test("should return 400 for invalid array elements", async () => {
		const res = await app.request("/sum", {
			method: "POST",
			body: JSON.stringify({ numbers: [1, "two", 3] }),
			headers: new Headers({ "Content-Type": "application/json" }),
		});
		expect(res.status).toBe(400);
	});
});
