export function factorial(n: number): number {
	if (n < 0) {
		throw new Error("Factorial is not defined for negative numbers");
	}

	if (!Number.isInteger(n)) {
		throw new Error("Factorial is only defined for integers");
	}

	if (n === 0 || n === 1) {
		return 1;
	}

	let result = 1;
	for (let i = 2; i <= n; i++) {
		result *= i;
	}

	return result;
}

export function sum(numbers: number[]): number {
	return numbers.reduce((acc, curr) => acc + curr, 0);
}
