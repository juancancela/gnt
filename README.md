# gnt - weather app test

## Demo

App is deployed on Heroku, and is publicly accessible [here](https://gnt-app.herokuapp.com/).

## Implementation description

* It has two main components: A [NodeJS](), [Express]() based API that implements a single endpoint to retrieve data from [Metaweather](https://www.metaweather.com/api), a 3rd party weather API.
* A React based app (made using [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html)) and making use of [Ant Design](https://ant.design/docs/react/introduce) UI library.
* Project structure contains two top level directories: /api and /app, corresponding to the two main bulding blocks described above.
* React app is built and added to the API's public folder (more details later on the local setup).

## Local Setup

### Prerequisites

1. Verify that *git* is installed.
2. Verify that *NodeJS 12.x* is installed.
3. Verify that *Docker* and *docker-compose* are installed.

### Setup

1. Clone project
2. On the project root folder, run ```npn install``` to install api dependencies.
3. Run ```cd app```and then ```npm install``` to install app dependencies.
4. On the same app directory, run ```npm run build```. This command will generate the app/build directory with a production ready build of the app that is referenced on the API static folder.
5. On the project root folder, create a .env file using .env.example as example.
6. On the project root folder, run ```npm start``` to start the api.
7. On a separate tab, run ```docker-compose -f docker-compose.yml up``` to spin a postgres database.
8. Navigate to <http://localhost:3000> (or the port specified on .env).

## Notes

* On the email where I receive the technical challenge there is a mention to provide a login, though the description of the challenge does not include the implementation of a login.
