import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInitialState } from "../mainSlice";
import Entry from "./Entry.jsx";
import Chatbox from "./Chatbox.jsx";
import Box from "@mui/material/Box";

const webSocket = new WebSocket("ws://localhost:443/");

export default function Entries(props) {
  const { entries } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  const newEntriesArray = entries.map(
    ({ id, voteCount, userVote, message }) => (
      <Entry
        key={id}
        entry={id}
        voteCount={voteCount}
        userVote={userVote}
        messageContent={message}
      />
    )
  );

  return (
    <>
      {newEntriesArray}
      <br />
      <br />
      <Chatbox />
    </>
  );
}
