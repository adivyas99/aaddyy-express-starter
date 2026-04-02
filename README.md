# AADDYY Express Starter

A minimal Express API with [AADDYY](https://www.aaddyy.com) AI tools — articles, images, logos, SEO analysis, math solving, and title generation.

## Quick Start

```bash
git clone https://github.com/nandanv99/aaddyy-express-starter.git
cd aaddyy-express-starter
npm install
```

Get an API key at [aaddyy.com/api-keys](https://www.aaddyy.com/api-keys) (50 free credits, no card):

```bash
cp .env.example .env
# Edit .env and add your API key
```

```bash
npm run dev
```

Server runs on [localhost:3000](http://localhost:3000).

## API Routes

| Route | Method | Body | Description |
|-------|--------|------|-------------|
| `/api/article` | POST | `{ topic, tone?, length? }` | Generate an AI article |
| `/api/image` | POST | `{ prompt, style? }` | Generate an AI image |
| `/api/logo` | POST | `{ keyword, type?, color? }` | Generate a logo |
| `/api/seo` | POST | `{ url }` | Analyze a URL for SEO |
| `/api/math` | POST | `{ problem }` | Solve a math problem |
| `/api/titles` | POST | `{ topic, count? }` | Generate title ideas |
| `/health` | GET | — | Health check |

## Examples

```bash
# Generate an article
curl -X POST http://localhost:3000/api/article \
  -H "Content-Type: application/json" \
  -d '{"topic": "AI trends in 2026"}'

# Generate a logo
curl -X POST http://localhost:3000/api/logo \
  -H "Content-Type: application/json" \
  -d '{"keyword": "TechStartup", "type": "modern"}'

# Analyze SEO
curl -X POST http://localhost:3000/api/seo \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'

# Solve math
curl -X POST http://localhost:3000/api/math \
  -H "Content-Type: application/json" \
  -d '{"problem": "integrate x^2 from 0 to 5"}'
```

## How It Works

One file (`index.js`), 6 routes, all powered by the AADDYY SDK:

```javascript
const { AADDYY } = require('aaddyy')
const ai = new AADDYY() // reads AADDYY_API_KEY from env

const result = await ai.articles.generate({ topic: 'AI trends' })
```

## Deploy

Works on any Node.js host. Set `AADDYY_API_KEY` as an environment variable.

**Railway:**
```bash
railway init
railway up
```

**Vercel (serverless):** Use the Next.js starter instead.

**Docker:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
```

## Links

- [AADDYY](https://www.aaddyy.com)
- [API Documentation](https://www.aaddyy.com/docs)
- [SDK on npm](https://www.npmjs.com/package/aaddyy)
- [Get API Key](https://www.aaddyy.com/api-keys)
