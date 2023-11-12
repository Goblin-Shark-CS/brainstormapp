import { setInitialState, addEntry, toggleVote } from "../mainSlice";

export default function webSocketMiddleware(wsUrl) {
    let socket = null;

    const onOpen = (store) => (event) => {
        console.log("We are connected")
        webSocket.send(JSON.stringify({ type: "join" }));
    };

    const onClose = (store) => (event) => { };

    const onMessage = (store) => (event) => {
        const message = JSON.parse(event.data);
        console.log(message);
        switch (message.type) {
            case "init":
                console.log("Init message. State: ", message.state);
                dispatch(setInitialState(message.state));
                break;
            case "message":
                // Server format: {"response": String }
                const entry_id = message.response._id;
                const message = message.response.message;
                dispatch(addEntry({ entry_id, message }));
                console.log("New message");
                break;
        };
    };

    return store => next => action => {
        switch (action.type) {
            case 'WEBSOCKET_CONNECT':
                if (socket !== null) {
                    socket.close();
                }

                // Create a new WebSocket connection
                socket = new WebSocket(wsUrl);
                socket.onopen = onOpen(store);
                socket.onclose = onClose(store);
                socket.onmessage = onMessage(store);
                break;
            case 'WEBSOCKET_DISCONNECT':
                if (socket !== null) {
                    socket.close();
                }
                socket = null;
                break;
            case 'WEBSOCKET_SEND':
                if (socket !== null) {
                    socket.send(JSON.stringify(action.payload));
                }
                break;
            default:
                return next(action);
        }
    };
};