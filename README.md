# Coffee

## Local Development

### Cloning the repository

```bash
git clone git@github.com:TechGenius7777/coffee.git
```

```bash
cd coffee
```

### Installing packages

At the root of the repository, run the following command:

```bash
pnpm install
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

```bash
pnpm dev
```

## Docker

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
