import { describe, it, expect } from "vitest";
import { factorial, sum } from "./calculator";

describe("factorial", () => {
	it("should calculate factorial of 0", () => {
		expect(factorial(0)).toBe(1);
	});

	it("should calculate factorial of 1", () => {
		expect(factorial(1)).toBe(1);
	});

	it("should calculate factorial of 5", () => {
		expect(factorial(5)).toBe(120);
	});

	it("should calculate factorial of 10", () => {
		expect(factorial(10)).toBe(3628800);
	});

	it("should throw error for negative numbers", () => {
		expect(() => factorial(-1)).toThrow(
			"Factorial is not defined for negative numbers",
		);
	});

	it("should throw error for non-integers", () => {
		expect(() => factorial(3.5)).toThrow(
			"Factorial is only defined for integers",
		);
	});
});

describe("sum", () => {
	it("should calculate sum of empty array", () => {
		expect(sum([])).toBe(0);
	});

	it("should calculate sum of single element", () => {
		expect(sum([5])).toBe(5);
	});

	it("should calculate sum of multiple elements", () => {
		expect(sum([1, 2, 3, 4, 5])).toBe(15);
	});

	it("should handle negative numbers", () => {
		expect(sum([-1, -2, -3])).toBe(-6);
	});

	it("should handle mixed positive and negative numbers", () => {
		expect(sum([10, -5, 3, -2])).toBe(6);
	});

	it("should handle decimal numbers", () => {
		expect(sum([1.5, 2.5, 3.5])).toBe(7.5);
	});
});
