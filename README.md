# 🌱 Reflecta

Reflecta started as a fun challenge to push my skills as a developer and problem solver. What began as an experiment evolved into a full-stack mood tracker and journaling application focused on helping users understand and reflect on their emotional wellbeing over time.

Whether you're documenting a great day, processing a difficult one, or simply checking in with yourself, Reflecta provides a clean and distraction-free space for self-reflection. It also includes an optional public mood-sharing feature for those who want to share their experiences with others.

Beyond the application itself, Reflecta is also an exploration of modern open-source software development. The project is built entirely on open technologies and can be developed locally, self-hosted on your own infrastructure, or deployed to any cloud provider without vendor lock-in.

## ✨ Features

* 📝 Create journal entries and mood logs
* 😊 Track emotional wellbeing over time
* 🌍 Optionally share moods publicly
* 🎨 Clean, minimalist, and responsive user experience
* ⚡ Fast full-stack architecture powered by modern tooling
* 🔒 End-to-end type safety with TypeScript
* ✅ Shared validation using Zod on both frontend and backend
* 🏠 Self-hostable and cloud-agnostic deployment

## 🛠️ Tech Stack

### Frontend

* Nuxt.js
* TypeScript
* TailwindCSS
* DaisyUI
* Zod

### Backend

* Express.js
* TypeScript
* Zod

### Database

* PostgreSQL
* Prisma ORM

### Tooling

* Turborepo
* pnpm
* Docker

## 🔓 Open Source & Self-Hosted First

Reflecta is built entirely using open-source technologies and does not require any proprietary cloud services to run.

## 🏗️ Project Structure

```text
reflecta/
├── apps/
│   ├── web/          # Nuxt.js frontend
│   └── server/       # Express.js backend
├── packages/         # Shared packages and utilities
├── prisma/           # Database schema and migrations
├── turbo.json        # Turborepo configuration
└── docker-compose.yml
```

## 🚀 Getting Started

### Clone the Repository

```bash
git clone git@github.com:supratikmahato/reflecta.git
cd reflecta
```

# 💻 Local Development

### 1. Install Dependencies

From the project root:

```bash
pnpm install
```

### 2. Start PostgreSQL

Run a PostgreSQL container for local development:

```bash
docker run \
  --name coffee-db \
  -e POSTGRES_PASSWORD=coffeeislife \
  -d \
  -p 5432:5432 \
  postgres:alpine
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
SERVER_PORT=8000
DATABASE_URL="postgresql://postgres:coffeeislife@localhost:5432/postgres"
ACCESS_TOKEN_SECRET=
GITHUB_TOKEN=
```

#### Environment Variables

| Variable              | Description                           |
| --------------------- | ------------------------------------- |
| `SERVER_PORT`         | Backend server port                   |
| `DATABASE_URL`        | PostgreSQL connection string          |
| `ACCESS_TOKEN_SECRET` | Secret used for authentication tokens |
| `GITHUB_TOKEN`        | GitHub API token (if applicable)      |

### 4. Run Database Migrations

Apply the latest schema changes:

```bash
pnpm db:migrate:dev
```

### 5. Generate Prisma Client & Types

```bash
pnpm db:generate
```

### 6. Start the Development Environment

```bash
pnpm dev
```

🎉 That's it!

# 🐳 Running with Docker

Reflecta can be run entirely through Docker.

### 1. Configure Environment Variables

Create a `.env` file in the project root:

```env
ACCESS_TOKEN_SECRET=
```

### 2. Build the Images

```bash
docker compose build
```

### 3. Start the Containers

#### Interactive Mode (with logs)

```bash
docker compose up
```

#### Detached Mode

```bash
docker compose up -d
```

### Stop the Containers

```bash
docker compose down
```

## 🧰 Useful Commands

### Start Development

```bash
pnpm dev
```

### Run Database Migrations

```bash
pnpm db:migrate:dev
```

### Generate Prisma Client

```bash
pnpm db:generate
```

### View Docker Logs

```bash
docker compose logs -f
```

### Stop Docker Containers

```bash
docker compose down
```
