
## Installation

### API

```bash
$ cd /server
$ npm install
```

### Client

```bash
$ cd ..
$ cd /client-react
$ npm install
```

## Running the app using node server (the normal way)

```bash
#Install mongo on you machine or install a docker image > container
$ docker pull mongo
$ docker run -d -p 27017-27019:27017-27019 --name mongodb mongo
```

### API

```bash
# development
$ npm run start:dev
or
nest start

# Debug/watch
$ npm run start:debug

# production
$ npm run build:prod
$ npm start
```

### Client

```bash
# development
$ npm run start

# production
$ npm run build
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Using Docker Compose

Ensure also that [Docker is installed](https://docs.docker.com/engine/install) on your work station

```bash
# Build the docker image
$ docker-compose build

# Start the container
$ docker-compose up
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Testing

### API

```bash
# unit tests
$ cd /server
$ npm run test

# test coverage
$ npm run test:cov
```

## Resources

LinkedIn Profile: https://www.linkedin.com/in/alejomartinez/

## Notes

1. All this year (2020) I have been working with NodeJS, ReactJS and MongoDB, Express
2. This is the first challenge for an application like Full Stack Web Developer
3. This is my first app working with NestJS, TypeScrypt, React in TS, Jest, and Docker. It was a great challenge.

## License

[MIT licensed](LICENSE)
