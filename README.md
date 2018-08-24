# Team Up Server API

Simple node + express server implementing a REST API

## Technologies

- Node.js
- Express
- JWT Authentication
- PostGres
- Docker

## Usage

### Installation

Install the dependencies

```sh
$ npm install
```

Run server as developer

```sh
$ npm run watch
```

Run server in production environment

```sh
$ npm start
```

## Database set up (local)

https://github.com/full-stack-hardcore/teamup-server/wiki/Local-postgres-setup-via-Docker

When using Docker Toolbox, it may be needed to enable port forwarding on the VM created by oracle, the port rules for Postgres are:

- Protocol: TCP
- Host IP: 5432
- Guest Port: 5432

## Sample .env file (local)

```
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=gretel
```

## Migrations

```sh
$ npm run migrate
```
