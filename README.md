# TricountRat

This application is based on the simplified features of [Tricount](https://www.tricount.com/fr/faire-les-comptes-entre-amis).

## Prerequisites

![docker](https://img.shields.io/badge/docker-v27-2496ED?logo=docker&logoColor=white&labelColor=2496ED&color=white)
![docker-compose](https://img.shields.io/badge/docker--compose-v1-2496ED?logo=docker&logoColor=white&labelColor=2496ED&color=white)

## Configuration

### Defining Environment Variables

To use your own environment variables, you need to redefine the variables present in the `.env.example` file by creating a new `.env` file with your chosen values.

## Installation

The following command will start the `node`, `postgres`, and `pgadmin` containers required for the project using the images referenced in the `docker-compose.yml` file.

```bash
docker-compose up --build -d
```

Create the database:

```bash
docker exec tricount-rat-app npx prisma migrate dev
```

Seed the database with mock data (already done by the previous command):

```bash
docker exec tricount-rat-app npx prisma db seed
```

You can now access the various tools on the following ports:

- `API documentation`: [http://localhost:3000/api](http://localhost:3000/api) - API documented with Swagger
- `Postgres`: [http://localhost:5432](http://localhost:5432)
- `pgAdmin`: [http://localhost:5050](http://localhost:5050)

Log in to the various tools using the credentials from your `.env` file.

## Useful Information

- Install dependencies directly from the container:

```bash
docker exec tricount-rat-app npm install {package-name}
```

- Run the project in `production` mode:

```bash
docker exec tricount-rat-app npm run start:prod
```

## TODO

- Fix the many typing issues or lack of typing

## License

This project is licensed under the GPL License. See the [LICENSE](./LICENSE) file for more details.
