# Hono Template

A modern, type-safe REST API template built with [Hono](https://hono.dev/), featuring TypeScript, Zod validation, and production-ready tooling.

## Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server with hot reload:

```bash
npm run dev
```

The server will start at `http://localhost:3000` (or the port specified in `config.json`).

### Testing

```bash
# Test the API
curl http://localhost:3000

# Test the factorial endpoint
curl http://localhost:3000/factorial/5

# Test the sum endpoint
curl -X POST http://localhost:3000/sum \
  -H "Content-Type: application/json" \
  -d '{"numbers": [1, 2, 3, 4, 5]}'
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (using [tsdown](https://tsdown.dev/))
- `npm start` - Start production server
- `npm test` - Run tests with Vitest
- `npm run typecheck` - Type check without emitting files
- `npm run format` - Format code with [Biome](https://biomejs.dev/)
- `npm run lint` - Lint code with Biome
- `npm run lint:fix` - Auto-fix linting issues

## Project Structure

```
.
├── src/
│   ├── calculator.ts      # Calculator utility functions
│   ├── calculator.test.ts # Calculator tests
│   ├── config.ts          # Configuration loader
│   ├── env.ts             # Environment types
│   ├── index.ts           # Main app with routes
│   ├── index.test.ts      # API integration tests
│   └── serve.ts           # Server entry point
├── config.json            # Application configuration
├── package.json
└── ...
```

## License

MIT

