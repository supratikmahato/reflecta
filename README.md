# Reflecta

## Cloning the repository

```bash
git clone git@github.com:supratikmahato/reflecta.git
```

```bash
cd reflecta
```

## Local development

### Installing packages

At the root of the repository, run the following command:

```bash
pnpm install
```

### Creating a Docker PostgreSQL database for development

At the root of the repository, run the following command:

```bash
docker run --name coffee-db -e POSTGRES_PASSWORD=coffeeislife -d -p 5432:5432 postgres:alpine
```

### Adding a `.env` file

At the root of the repository, create a `.env` file with the following contents:

```env
SERVER_PORT=8000
DATABASE_URL="postgresql://postgres:coffeeislife@localhost:5432/postgres"
ACCESS_TOKEN_SECRET=
GITHUB_TOKEN=
```

### Migrating schemas to the database

At the root of the repository, run the following command:

```bash
pnpm db:migrate:dev
```

### Generating types for the database

At the root of the repository, run the following command:

```bash
pnpm db:generate
```

### Running the application

At the root of the repository, run the following command:

```bash
pnpm dev
```

## Docker

### Adding a `.env` file

At the root of the repository, create a `.env` file with the following contents:

```env
ACCESS_TOKEN_SECRET=
```

### Building the image

At the root of the repository, run the following command:

```bash
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker compose build
```

### Running the containers in interactive mode (with logs visible)

At the root of the repository, run the following command:

```bash
docker compose up
```

### Running the containers in detached mode (without logs visible)

At the root of the repository, run the following command:

```bash
docker compose up -d
```
