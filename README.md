# Idea Station

## Description

Idea Station is an app for quick frictionless ideation with a team. No clunky setup required. A user creates a new room with the click of a button, then shares the unique link via a qr code. Everyone can add ideas which update across all users in real time. Then users can vote for the ideas they like, with the highest rated ideas rising to the top. Ideas and voting are anonymous to take away the pressure of judgement, encouraging freer ideation.

**Created by Michael Abrahams, Diana Alokhina, Dennis Corsi, Omar Mirza, and Andrew Sobottka**

Before running the app, be sure to run these commands:
`npm install`
`npm run build`

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

To create the tables in your own database, replace the PG_URI link on line 3 in brainstormModels.js with your own postgres link. Then uncomment line 110 and run the file. Once the tables are created, you can comment that line back out.

sqlFunctions.js has a lot of useful funtions to interact with the database.

#### Components

The components were built using [MaterialUI](https://mui.com/material-ui/).

#### The Server and Websocket

Initial routing is done via express. Upon clicking the Create Room button, the client is sent to the /start endpoint where a room is created. From there, the client is redirected to the /join endpoint for the newly created room. Once there, a new user is created and the user id is stored in the client's cookies. Finally app.html is sent to the client.

When the App component renders, it initiates the websocket connection via a dispatch in the useEffect. All Redux dispatches are first sent through WebSocketMiddleware.js (this was confirgured in store.js). You'll see the WEBSOCKET_CONNECT switch case creates a new WebSocket.

**To better understand how data is flowing, we'll walk through a sample action and its path through the code.**

#### Part 1: Frontend to Backend

A user types a message and hits the Post button. This triggers the sendMessage function, which grabs the text from the text field. Then an action is dispatched with the type 'WEBSOCKET_SEND' and a payload carrying the text. As previously stated, all dispatches initially go through the WebSocketMiddleware, so that's our first stop. There we find the switch case that matches the action type ('WEBSOCKET_SEND). Here we call socket.send() attaching the payload. This function sends that payload from the frontend socket portal through to the backend socket portal (similar to sending an HTTP request with a body.)

#### Part 2: Backend

Any payloads sent to the server through the websocket are picked up by ws.on('message', func). (Note that this 'message' has nothing to do with the payload of this particular action being a message. 'message' is a built in eventListener in websocket that is fired anytime a payload comes through the socket.) The payload itself comes in through the parameter we called 'rawMessage', which is then JSON parsed into the variable 'message'. Then we use a switch statement on the type parameter on that message, which in this example is 'entry'. (We call each post submitted post by the user an "entry".) Within that case, the new entry is first saved to the SQL database and the SQL generated id for that new entry is returned. Then we wrap up the entry text and id into another payload and JSON.stringify it to prepare it for its journey back through the websocket. The wsserver object has a property labeled 'clients' which is an array of all clients currently connected. Using a forEach we send the payload out to every connected client with the same method that was used to launch data into the portal from the other direction, .send();

#### Part 3: Backend to Frontend

The payload is recieved in the same place it was originally sent off in part 1, webSocketMiddleware. (Except that this payload was initiated by just one client, but is now being recieved by all clients.) Recieved messages enter the onMessage function where they are routed by type in the switch block. The type we are dealing with right now is 'entry', so we enter that case, which sends a dispatch directly to the store with the action addEntry. Finally we enter the reducers in mainSlice.js where the entry is added to the state and rendered on the client's app.

What a journey!
