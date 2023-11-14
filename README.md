# Idea Station

## Description

Idea Station is an app for quick frictionless ideation with a team. No clunky setup required. A user creates a new room with the click of a button, then shares the unique link via a qr code. Everyone can add ideas which update across all users in real time. Then users can vote for the ideas they like, with the highest rated ideas rising to the top. Ideas and voting are anonymous to take away the pressure of judgement, encouraging freer ideation.

Before running the app, be sure to run these commands:
npm install
npm run build

## For Developers

### Core Technologies

You should have a general understanding of these technologies before altering the code:

- Websocket
- Express
- Redux & Redux Toolkit
- MaterialUI
- React
- PostgreSQL

### Tour of the code

#### Database

We use a PostgreSQL database. The schema can be found [at this link](https://drawsql.app/teams/goblin-shark/diagrams/brainstorm-app)

To create the tables in your own database, replace the PG_URI link on line 3 in brainstormModels.js with your own postgres link. Then uncomment line 110 and run the file. Once the tables are created, you can comment that line out.

sqlFunctions.js has a lot of useful funtions to interact with the database.

#### Components

The components were build using [MaterialUI](https://mui.com/material-ui/).

#### The Server

Initial routing is done via express. Upon clicking the Create Room button, the client is sent to the /start endpoint where a room is created. From there, the client is redirected to the /join endpoint for the newly created room. Once there, a new user is created and the user id is stored in the client's cookies. Finally app.html is sent to the client.

When the App component renders, it initiates the websocket connection via a dispatch in the useEffect.
